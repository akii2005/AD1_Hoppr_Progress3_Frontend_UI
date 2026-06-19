window.HopprProfile = {
  saveProfile() {
    const user = HopprUI.getUser();
    user.name = document.getElementById('profileName').value.trim() || user.name;
    user.phone = document.getElementById('profilePhone').value.trim() || user.phone;
    user.degree = document.getElementById('profileDegree').value.trim() || user.degree;
    user.faculty = document.getElementById('profileFaculty').value.trim() || user.faculty;
    HopprUI.addNotification('Profile information updated successfully.');
    HopprUI.toast('Profile saved successfully.');
    HopprUI.go('profile');
  },
  toggleSetting(key) {
    HopprState.settings[key] = !HopprState.settings[key];
    HopprUI.addNotification(`${key === 'darkMode' ? 'Dark mode' : 'Notifications'} setting updated.`);
    HopprUI.render();
  }
};

HopprUI.register('profile', () => {
  const user = HopprUI.getUser();
  const content = `
    <div class="card profile-card">
      <div class="profile-cover"></div>
      <div class="avatar">${HopprUI.escape(user.name.split(' ').map(x => x[0]).slice(0, 2).join(''))}</div>
      <h3>${HopprUI.escape(user.name)}</h3>
      <p><span class="pill success">Verified UTM Account</span></p>
      <div class="stack" style="text-align:left;margin-top:16px">
        <div class="row"><span class="pill">✉️ Email</span><strong>${HopprUI.escape(user.email)}</strong></div>
        <div class="row"><span class="pill">☎️ Phone</span><strong>${HopprUI.escape(user.phone)}</strong></div>
        <div class="row"><span class="pill">🎓 Matric</span><strong>${HopprUI.escape(user.matric)}</strong></div>
        <div class="row"><span class="pill">🏛️ Faculty</span><strong>${HopprUI.escape(user.faculty)}</strong></div>
      </div>
      <button class="primary-btn" style="margin-top:18px" onclick="HopprUI.go('editProfile')">Edit Profile</button>
      <button class="ghost-btn" style="margin-top:10px" onclick="HopprUI.go('settings')">Settings</button>
      <button class="danger-btn" style="margin-top:10px" onclick="HopprUI.go('login')">Log Out</button>
    </div>
  `;
  return HopprUI.shell('Profile', 'View and manage account information', content, 'profile');
});

HopprUI.register('editProfile', () => {
  const user = HopprUI.getUser();
  const content = `
    <div class="form-card">
      <div class="row" style="justify-content:center;margin-bottom:18px"><div class="avatar">${HopprUI.escape(user.name.split(' ').map(x => x[0]).slice(0, 2).join(''))}</div></div>
      ${HopprUI.input('profileName', 'Full Name', 'text', user.name)}
      ${HopprUI.input('profilePhone', 'Phone Number', 'tel', user.phone)}
      ${HopprUI.input('profileDegree', 'Degree / Programme', 'text', user.degree)}
      ${HopprUI.input('profileFaculty', 'Faculty', 'text', user.faculty)}
      <button class="primary-btn" onclick="HopprProfile.saveProfile()">Save Changes</button>
    </div>
  `;
  return HopprUI.shell('Edit Profile', 'Update profile details', content, 'profile', { back: 'profile' });
});

HopprUI.register('settings', () => {
  const s = HopprState.settings;
  const content = `
    <div class="stack">
      <div class="card row">
        <div>
          <h3>Dark Mode</h3>
          <p>Switch the application interface to dark color mode.</p>
        </div>
        <button class="switch ${s.darkMode ? 'on' : ''}" onclick="HopprProfile.toggleSetting('darkMode')"><span></span></button>
      </div>
      <div class="card row">
        <div>
          <h3>Push Notifications</h3>
          <p>Receive real-time booking, arrival, and completion alerts.</p>
        </div>
        <button class="switch ${s.notifications ? 'on' : ''}" onclick="HopprProfile.toggleSetting('notifications')"><span></span></button>
      </div>
      <div class="notice">These settings are saved in the prototype state to simulate shared_preferences behavior.</div>
      <button class="primary-btn" onclick="HopprUI.go('profile')">Done</button>
    </div>
  `;
  return HopprUI.shell('Settings', 'Dark/light mode and notifications', content, 'profile', { back: 'profile' });
});

HopprUI.register('notifications', () => {
  const content = `
    <div class="stack">
      ${HopprState.notifications.map(n => `
        <div class="card">
          <div class="row"><strong>🔔 Update</strong><span class="pill">${HopprUI.escape(n.time)}</span></div>
          <p>${HopprUI.escape(n.text)}</p>
        </div>
      `).join('')}
    </div>
  `;
  return HopprUI.shell('Notifications', 'Real-time alerts and updates', content, 'home', { back: 'home' });
});
