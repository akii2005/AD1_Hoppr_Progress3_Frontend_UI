window.HopprRide = {
  estimate() {
    const vehicleId = document.getElementById('vehicleType')?.value || 'motor';
    const fare = HopprHelpers.calculateFare(1.8, vehicleId);
    const target = document.getElementById('farePreview');
    if (target) target.textContent = HopprUI.money(fare);
  },
  requestRide() {
    const pickup = document.getElementById('ridePickup').value;
    const dropoff = document.getElementById('rideDropoff').value;
    const vehicleId = document.getElementById('vehicleType').value;
    if (pickup === dropoff) return HopprUI.toast('Pickup and destination cannot be the same.', 'danger');
    const vehicle = HopprState.vehicleTypes.find(v => v.id === vehicleId);
    const fare = HopprHelpers.calculateFare(1.8, vehicleId);
    HopprState.activeRide = {
      id: HopprHelpers.createId('R'),
      from: pickup,
      to: dropoff,
      vehicle,
      fare,
      status: 'Accepted',
      driver: 'Tanzid Uddin',
      plate: vehicleId === 'motor' ? 'JQB 1198' : 'JEA 2409',
      eta: vehicle.eta,
      payment: document.getElementById('paymentMethod').value
    };
    HopprUI.addNotification(`Ride ${HopprState.activeRide.id} accepted by ${HopprState.activeRide.driver}.`);
    HopprUI.go('rideTracking');
  },
  nextStatus() {
    const ride = HopprState.activeRide;
    const flow = ['Accepted', 'On the way', 'Arrived', 'Completed'];
    const next = flow[Math.min(flow.indexOf(ride.status) + 1, flow.length - 1)];
    ride.status = next;
    if (next === 'Completed') return HopprUI.go('payment');
    HopprUI.addNotification(`Ride status updated: ${next}.`);
    HopprUI.render();
  },
  cancelRide() {
    HopprState.activeRide = null;
    HopprUI.addNotification('Ride request cancelled.');
    HopprUI.go('ride');
  },
  finishPayment() {
    const ride = HopprState.activeRide;
    if (ride) {
      HopprState.rideHistory.unshift({ id: ride.id, from: ride.from, to: ride.to, fare: ride.fare, status: 'Completed', date: 'Today, Just now', driver: ride.driver });
      HopprUI.addNotification(`Payment confirmed for ${ride.id}.`);
      HopprState.activeRide = null;
    }
    HopprUI.toast('Payment confirmed and ride history updated.');
    HopprUI.go('history');
  }
};

HopprUI.register('home', () => {
  const user = HopprUI.getUser();
  const content = `
    <div class="hero-card">
      <h2>Hello, ${HopprUI.escape(user.name.split(' ')[0])} 👋</h2>
      <p>Book campus rides, deliver parcels, order food, and track everything in one verified UTM app.</p>
      <div class="hero-grid">
        <div class="hero-stat"><strong>4 min</strong><span>Nearest driver</span></div>
        <div class="hero-stat"><strong>RM 4.80</strong><span>Avg. campus ride</span></div>
      </div>
    </div>
    <div class="section-title"><h3>Main Services</h3><small>High Fidelity UI</small></div>
    <div class="quick-grid">
      <button class="quick-card" onclick="HopprUI.go('ride')"><div class="quick-icon">🚕</div><h3>Book Ride</h3><p>Pickup, destination, fare estimate, and tracking.</p></button>
      <button class="quick-card" onclick="HopprUI.go('delivery', {tab:'parcel'})"><div class="quick-icon">📦</div><h3>Parcel</h3><p>Send small items with tracking code.</p></button>
      <button class="quick-card" onclick="HopprUI.go('delivery', {tab:'food'})"><div class="quick-icon">🍱</div><h3>Food</h3><p>Order from campus cafes and canteens.</p></button>
      <button class="quick-card" onclick="HopprUI.go('driver')"><div class="quick-icon">🧑‍✈️</div><h3>Driver Mode</h3><p>Go online and accept ride or delivery jobs.</p></button>
    </div>
    <div class="section-title"><h3>Campus Coverage</h3><small>Live map style</small></div>
    ${HopprUI.map('Drivers around UTM Johor Bahru')}
    <div class="section-title"><h3>Recent Activity</h3><button class="link-btn" onclick="HopprUI.go('history')">View all</button></div>
    <div class="card">
      <div class="row"><strong>${HopprUI.escape(HopprState.rideHistory[0].from)} → ${HopprUI.escape(HopprState.rideHistory[0].to)}</strong><span class="pill success">Paid</span></div>
      <p>${HopprUI.escape(HopprState.rideHistory[0].date)} · ${HopprUI.money(HopprState.rideHistory[0].fare)}</p>
    </div>
  `;
  return HopprUI.shell('Hoppr', 'Verified UTM mobility platform', content, 'home', { backIcon: 'H' });
});

HopprUI.register('ride', () => {
  const vehicleOptions = HopprState.vehicleTypes.map(v => ({ value: v.id, label: `${v.icon} ${v.label} · ETA ${v.eta}` }));
  const content = `
    ${HopprUI.map('Select pickup and destination')}
    <div class="form-card" style="margin-top:14px">
      ${HopprUI.select('ridePickup', 'Pickup Location', HopprState.locations, 'Kolej Rahman Putra')}
      ${HopprUI.select('rideDropoff', 'Destination', HopprState.locations, 'Faculty of Computing')}
      ${HopprUI.select('vehicleType', 'Vehicle Type', vehicleOptions, 'motor')}
      ${HopprUI.select('paymentMethod', 'Payment Method', ['Cash', 'Online Banking', 'E-Wallet'], 'Cash')}
      <div class="card" style="padding:14px;background:#f7fbff;margin-bottom:14px">
        <div class="row"><span>Estimated Fare</span><strong id="farePreview">RM 4.92</strong></div>
        <p>Fare is calculated from base fee, distance, and service fee.</p>
      </div>
      <button class="primary-btn" onclick="HopprRide.requestRide()">Request Ride</button>
    </div>
  `;
  setTimeout(() => {
    document.getElementById('vehicleType')?.addEventListener('change', HopprRide.estimate);
    HopprRide.estimate();
  }, 0);
  return HopprUI.shell('Book a Ride', 'Fare estimate and live driver matching', content, 'ride');
});

HopprUI.register('rideTracking', () => {
  const ride = HopprState.activeRide;
  if (!ride) return HopprUI.shell('Active Ride', 'No active ride found', '<div class="empty-state"><span class="big">🚕</span>No active ride.<br><br><button class="primary-btn" onclick="HopprUI.go(\'ride\')">Book New Ride</button></div>', 'ride');
  const content = `
    ${HopprUI.map(`${ride.driver} is ${ride.eta} away`)}
    <div class="card" style="margin-top:14px">
      <div class="row">
        <div class="row" style="justify-content:flex-start"><div class="avatar">TU</div><div><h3>${HopprUI.escape(ride.driver)}</h3><p>${HopprUI.escape(ride.vehicle.label)} · ${HopprUI.escape(ride.plate)}</p></div></div>
        <span class="pill success">${HopprUI.escape(ride.status)}</span>
      </div>
      <div class="fare-list">
        <div class="row"><span>Pickup</span><strong>${HopprUI.escape(ride.from)}</strong></div>
        <div class="row"><span>Destination</span><strong>${HopprUI.escape(ride.to)}</strong></div>
        <div class="row"><span>Fare</span><strong>${HopprUI.money(ride.fare)}</strong></div>
      </div>
      ${HopprUI.timeline(ride.status)}
      <button class="primary-btn" onclick="HopprRide.nextStatus()">${ride.status === 'Arrived' ? 'Complete Ride' : 'Update Status'}</button>
      <button class="danger-btn" style="margin-top:10px" onclick="HopprRide.cancelRide()">Cancel Ride</button>
    </div>
  `;
  return HopprUI.shell('Active Ride', `Booking ${ride.id}`, content, 'ride');
});

HopprUI.register('payment', () => {
  const ride = HopprState.activeRide;
  if (!ride) return HopprUI.go('history');
  const content = `
    <div class="card">
      <span class="pill success">Trip Completed</span>
      <h3 style="margin-top:14px">Fare Summary</h3>
      <div class="amount">${HopprUI.money(ride.fare)}</div>
      <div class="fare-list">
        <div class="row"><span>Trip ID</span><strong>${HopprUI.escape(ride.id)}</strong></div>
        <div class="row"><span>Route</span><strong>${HopprUI.escape(ride.from)} → ${HopprUI.escape(ride.to)}</strong></div>
        <div class="row"><span>Payment</span><strong>${HopprUI.escape(ride.payment)}</strong></div>
      </div>
      <h3>Rate Driver</h3>
      <div class="rating"><button>★</button><button>★</button><button>★</button><button>★</button><button>★</button></div>
      <button class="primary-btn" onclick="HopprRide.finishPayment()">Confirm Payment</button>
    </div>
  `;
  return HopprUI.shell('Payment', 'Confirm payment and rating', content, 'ride');
});

HopprUI.register('history', () => {
  const content = `
    <div class="stack">
      ${HopprState.rideHistory.map(ride => `
        <div class="job-card">
          <div class="row"><strong>${HopprUI.escape(ride.id)}</strong><span class="pill success">${HopprUI.escape(ride.status)}</span></div>
          <h3>${HopprUI.escape(ride.from)} → ${HopprUI.escape(ride.to)}</h3>
          <p>Driver: ${HopprUI.escape(ride.driver)} · ${HopprUI.escape(ride.date)}</p>
          <div class="row"><span>Total Fare</span><strong>${HopprUI.money(ride.fare)}</strong></div>
        </div>
      `).join('')}
    </div>
  `;
  return HopprUI.shell('Ride History', 'Past rides and payment statuses', content, 'ride', { back: 'ride' });
});
