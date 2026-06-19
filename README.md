window.HopprDriver = {
  toggleOnline() {
    HopprState.driverOnline = !HopprState.driverOnline;
    HopprUI.addNotification(HopprState.driverOnline ? 'Driver mode is online.' : 'Driver mode is offline.');
    HopprUI.render();
  },
  acceptJob(id) {
    const job = HopprState.availableJobs.find(j => j.id === id);
    if (!job) return;
    HopprState.currentJob = { ...job, status: 'Accepted' };
    HopprState.availableJobs = HopprState.availableJobs.filter(j => j.id !== id);
    HopprUI.addNotification(`Job ${id} accepted.`);
    HopprUI.go('tripExecution');
  },
  declineJob(id) {
    HopprState.availableJobs = HopprState.availableJobs.filter(j => j.id !== id);
    HopprUI.toast(`Job ${id} declined.`);
    HopprUI.render();
  },
  nextTripStatus() {
    const job = HopprState.currentJob;
    const flow = ['Accepted', 'Start Trip', 'On the way', 'Arrived', 'Completed'];
    const next = flow[Math.min(flow.indexOf(job.status) + 1, flow.length - 1)];
    job.status = next;
    if (next === 'Completed') {
      HopprState.earnings.unshift({ id: HopprHelpers.createId('E'), label: `${job.type} job to ${job.dropoff}`, amount: job.fare, time: 'Just now' });
      HopprUI.addNotification(`Job ${job.id} completed. Earnings updated.`);
    }
    HopprUI.render();
  },
  closeJob() {
    HopprState.currentJob = null;
    HopprUI.go('driver');
  }
};

HopprUI.register('driver', () => {
  const online = HopprState.driverOnline;
  const total = HopprState.earnings.reduce((sum, e) => sum + e.amount, 0);
  const content = `
    <div class="hero-card">
      <div class="row">
        <div>
          <h2>Driver Dashboard</h2>
          <p>Toggle availability, review nearby jobs, and manage trip execution.</p>
        </div>
        <button class="switch ${online ? 'on' : ''}" onclick="HopprDriver.toggleOnline()"><span></span></button>
      </div>
      <div class="hero-grid">
        <div class="hero-stat"><strong>${online ? 'Online' : 'Offline'}</strong><span>Availability</span></div>
        <div class="hero-stat"><strong>${HopprUI.money(total)}</strong><span>Total earnings</span></div>
      </div>
    </div>
    ${HopprState.currentJob ? `<div class="section-title"><h3>Current Job</h3><button class="link-btn" onclick="HopprUI.go('tripExecution')">Open</button></div>
      ${jobCard(HopprState.currentJob, true)}` : ''}
    <div class="section-title"><h3>Available Jobs</h3><small>${HopprState.availableJobs.length} nearby</small></div>
    <div class="stack">
      ${!online ? '<div class="notice warning">Go online to accept ride, parcel, and food delivery requests.</div>' : ''}
      ${HopprState.availableJobs.map(job => jobCard(job)).join('') || '<div class="empty-state"><span class="big">✅</span>No pending jobs.</div>'}
    </div>
    <div class="section-title"><h3>Earnings</h3><button class="link-btn" onclick="HopprUI.go('earnings')">View all</button></div>
    <div class="two-col"><div class="metric-card"><strong>${HopprUI.money(total)}</strong><span>This week</span></div><div class="metric-card"><strong>${HopprState.earnings.length}</strong><span>Completed jobs</span></div></div>
  `;
  return HopprUI.shell('Driver Mode', 'Accept or decline student requests', content, 'driver');
});

function jobCard(job, compact = false) {
  return `
    <div class="job-card">
      <div class="row"><strong>${HopprUI.escape(job.id)}</strong><span class="pill ${job.type === 'Ride' ? 'success' : 'warning'}">${HopprUI.escape(job.type)}</span></div>
      <h3>${HopprUI.escape(job.pickup)} → ${HopprUI.escape(job.dropoff)}</h3>
      <p>Passenger: ${HopprUI.escape(job.passenger)} · ${HopprUI.escape(job.distance)} · ETA ${HopprUI.escape(job.eta)}</p>
      <div class="row"><span>Estimated earning</span><strong>${HopprUI.money(job.fare)}</strong></div>
      ${compact ? '' : `<div class="two-col" style="margin-top:12px"><button class="primary-btn" ${HopprState.driverOnline ? '' : 'disabled'} onclick="HopprDriver.acceptJob('${job.id}')">Accept</button><button class="danger-btn" onclick="HopprDriver.declineJob('${job.id}')">Decline</button></div>`}
    </div>
  `;
}

HopprUI.register('tripExecution', () => {
  const job = HopprState.currentJob;
  if (!job) return HopprUI.shell('Trip Execution', 'No active job', '<div class="empty-state"><span class="big">🧑‍✈️</span>No active job.<br><br><button class="primary-btn" onclick="HopprUI.go(\'driver\')">Back to Driver Dashboard</button></div>', 'driver');
  const content = `
    ${HopprUI.map(`Executing ${job.type} job`)}
    <div class="card" style="margin-top:14px">
      <div class="row"><strong>${HopprUI.escape(job.id)}</strong><span class="pill success">${HopprUI.escape(job.status)}</span></div>
      <h3>${HopprUI.escape(job.type)} Request</h3>
      <div class="fare-list">
        <div class="row"><span>Pickup</span><strong>${HopprUI.escape(job.pickup)}</strong></div>
        <div class="row"><span>Drop-off</span><strong>${HopprUI.escape(job.dropoff)}</strong></div>
        <div class="row"><span>Passenger</span><strong>${HopprUI.escape(job.passenger)}</strong></div>
        <div class="row"><span>Earning</span><strong>${HopprUI.money(job.fare)}</strong></div>
      </div>
      ${HopprUI.timeline(job.status === 'Start Trip' ? 'On the way' : job.status)}
      ${job.status === 'Completed' ? `<button class="primary-btn" onclick="HopprDriver.closeJob()">Return to Dashboard</button>` : `<button class="primary-btn" onclick="HopprDriver.nextTripStatus()">${job.status === 'Accepted' ? 'Start Trip' : job.status === 'Arrived' ? 'Complete Trip' : 'Update Trip Status'}</button>`}
    </div>
  `;
  return HopprUI.shell('Trip Execution', `Job ${job.id}`, content, 'driver', { back: 'driver' });
});

HopprUI.register('earnings', () => {
  const total = HopprState.earnings.reduce((sum, e) => sum + e.amount, 0);
  const content = `
    <div class="two-col"><div class="metric-card"><strong>${HopprUI.money(total)}</strong><span>Total earnings</span></div><div class="metric-card"><strong>${HopprState.earnings.length}</strong><span>Completed jobs</span></div></div>
    <div class="stack" style="margin-top:14px">
      ${HopprState.earnings.map(e => `<div class="card row"><div><h3>${HopprUI.escape(e.label)}</h3><p>${HopprUI.escape(e.time)}</p></div><strong>${HopprUI.money(e.amount)}</strong></div>`).join('')}
    </div>
  `;
  return HopprUI.shell('Earnings', 'Driver income summary', content, 'driver', { back: 'driver' });
});
