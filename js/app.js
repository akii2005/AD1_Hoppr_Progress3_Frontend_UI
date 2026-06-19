(function () {
  function homeScreen() {
    if (!window.HopprUI.requireUser()) return '';
    const user = window.HopprState.activeUser;
    const activeRide = window.HopprState.activeRide;
    const delivery = window.HopprState.activeDelivery;
    return '<div class="stack">' +
      '<div class="hero-card"><h2>Hi, ' + window.HopprUI.escape(user.name.split(' ')[0]) + '</h2><p>Verified UTM services for rides, parcel delivery, food delivery, driver jobs and admin monitoring.</p><div class="hero-actions"><button class="secondary-btn" type="button" data-route="ride">Book Ride</button><button class="secondary-btn" type="button" data-route="delivery">Delivery</button></div></div>' +
      '<div class="grid-3">' +
        '<div class="metric-card"><span>Role</span><strong style="font-size:18px;">' + window.HopprUI.escape(user.role) + '</strong><small>Verified UTM account</small></div>' +
        '<div class="metric-card"><span>Active Ride</span><strong>' + (activeRide ? '1' : '0') + '</strong><small>' + (activeRide ? window.HopprUI.escape(activeRide.status) : 'No active trip') + '</small></div>' +
        '<div class="metric-card"><span>Delivery</span><strong>' + (delivery ? '1' : '0') + '</strong><small>' + (delivery ? window.HopprUI.escape(delivery.status) : 'No active order') + '</small></div>' +
      '</div>' +
      '<h3 class="section-title">Campus Services</h3>' +
      '<div class="grid-2">' +
        serviceCard('ride', '🚕', 'Ride Booking', 'Request campus rides, view fare, track driver and pay.') +
        serviceCard('delivery', '📦', 'Delivery Services', 'Book parcel or food delivery with live status.') +
        serviceCard('driver', '♢', 'Driver Dashboard', 'Go online, accept jobs, complete trips and view earnings.') +
        serviceCard('profile', '◉', 'Profile & Settings', 'Update profile, theme, and notification preference.') +
      '</div>' +
      '<h3 class="section-title">Notifications</h3>' + notificationList() +
      '<h3 class="section-title">Prototype Modules</h3>' + moduleCoverage() +
    '</div>';
  }

  function serviceCard(route, icon, title, description) {
    return '<button class="service-card" type="button" data-route="' + route + '"><span class="icon">' + icon + '</span><h3>' + window.HopprUI.escape(title) + '</h3><p>' + window.HopprUI.escape(description) + '</p></button>';
  }

  function notificationList() {
    return '<div class="list-card">' + window.HopprState.notifications.slice(0, 4).map(function (note, index) {
      return '<div class="list-row"><div class="row-icon">' + (index + 1) + '</div><div class="row-main"><strong>In-app alert</strong><span>' + window.HopprUI.escape(note) + '</span></div><span class="badge success">New</span></div>';
    }).join('') + '</div>';
  }

  function moduleCoverage() {
    const modules = [
      ['Authentication', 'Register, login, reset password and email verification.'],
      ['Profile Management', 'View/edit profile, dark mode and notifications.'],
      ['Ride Booking & Payment', 'Fare estimate, booking, tracking, payment and history.'],
      ['Delivery Services', 'Parcel and food delivery booking with tracking code.'],
      ['Driver Management', 'Online status, accept/decline jobs, complete trips, earnings.'],
      ['Admin', 'User verification, activity monitoring and reports.']
    ];
    return '<div class="list-card">' + modules.map(function (item) {
      return '<div class="list-row"><div class="row-icon">✓</div><div class="row-main"><strong>' + window.HopprUI.escape(item[0]) + '</strong><span>' + window.HopprUI.escape(item[1]) + '</span></div><span class="badge success">Ready</span></div>';
    }).join('') + '</div>';
  }

  function bindGlobalNavigation() {
    document.addEventListener('click', function (event) {
      const target = event.target.closest('[data-route]');
      if (!target) return;
      const route = target.getAttribute('data-route');
      if (route) window.HopprRouter.go(route);
    });

    const backButton = window.HopprUI.el('backButton');
    if (backButton) backButton.addEventListener('click', function () { window.HopprRouter.back(); });

    const themeButton = window.HopprUI.el('themeButton');
    if (themeButton) themeButton.addEventListener('click', function () {
      window.HopprState.darkMode = !window.HopprState.darkMode;
      document.body.classList.toggle('dark', window.HopprState.darkMode);
      themeButton.textContent = window.HopprState.darkMode ? '☀' : '☾';
      window.HopprUI.toast('Theme changed.', 'success');
    });
  }

  function init() {
    window.HopprRouter.register('home', homeScreen);
    bindGlobalNavigation();
    window.HopprRouter.go('auth', { mode: 'login' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
