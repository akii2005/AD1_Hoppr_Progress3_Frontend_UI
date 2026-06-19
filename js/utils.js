(function () {
  const state = {
    currentRoute: 'auth',
    previousRoute: 'auth',
    activeUser: null,
    darkMode: false,
    notificationsEnabled: true,
    driverOnline: true,
    activeRide: null,
    activeDelivery: null,
    rideHistory: [
      { id: 'R-0902', type: 'Ride', route: 'Kolej Tun Razak → UTM Library', date: 'Today, 10:10 AM', fare: 3.90, status: 'Completed' },
      { id: 'F-0815', type: 'Food', route: 'ArkED Meranti → Faculty of Computing', date: 'Yesterday, 7:45 PM', fare: 5.20, status: 'Delivered' }
    ],
    deliveryOrders: [],
    driverJobs: JSON.parse(JSON.stringify(window.HopprData.sampleJobs)),
    acceptedJobs: [],
    adminUsers: JSON.parse(JSON.stringify(window.HopprData.users)),
    notifications: [
      'Welcome to Hoppr verified campus services.',
      'Prototype includes ride, parcel, food, driver and admin flows.'
    ]
  };

  const routeMeta = {
    auth: ['Welcome', 'Campus verified rides'],
    home: ['Dashboard', 'Campus service overview'],
    ride: ['Ride Booking', 'Request and track rides'],
    payment: ['Payment', 'Fare summary and confirmation'],
    rideTracking: ['Live Ride', 'Driver GPS and trip status'],
    delivery: ['Delivery Services', 'Parcel and food management'],
    deliveryTracking: ['Delivery Tracking', 'Live order status'],
    driver: ['Driver Dashboard', 'Accept, decline and complete jobs'],
    profile: ['Profile & Settings', 'Manage account details'],
    admin: ['Admin Monitor', 'Verify users and monitor activity'],
    history: ['History', 'Completed services and payment records']
  };

  function el(id) { return document.getElementById(id); }
  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }
  function money(value) { return 'RM ' + Number(value || 0).toFixed(2); }
  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function createId(prefix) {
    return prefix + '-' + Math.floor(1000 + Math.random() * 9000);
  }
  function validUtmEmail(email) {
    return /@(student\.utm\.my|graduate\.utm\.my|utm\.my)$/i.test(String(email || '').trim());
  }
  function setTitle(route) {
    const meta = routeMeta[route] || routeMeta.home;
    el('screenTitle').textContent = meta[0];
    el('screenCaption').textContent = meta[1];
  }
  function toast(message, type) {
    const box = el('toast');
    box.className = 'toast ' + (type || '');
    box.textContent = message;
    box.classList.add('show');
    clearTimeout(window.HopprToastTimer);
    window.HopprToastTimer = setTimeout(function () { box.classList.remove('show'); }, 2800);
  }
  function map(title, label) {
    return '<div class="map-card">' +
      '<div class="map-toolbar"><strong>' + escapeHTML(title || 'UTM campus map') + '</strong><span class="badge success">Live GPS</span></div>' +
      '<div class="map-surface" aria-label="Map placeholder for prototype">' +
      '<div class="route-line"></div><div class="pin start"><span>A</span></div><div class="pin end"><span>B</span></div><div class="driver-dot">🚗</div>' +
      '<div class="map-label">' + escapeHTML(label || 'Google Maps Flutter / Geolocator placeholder') + '</div>' +
      '</div></div>';
  }
  function input(id, label, type, value, placeholder) {
    return '<div class="input-group"><label for="' + id + '">' + escapeHTML(label) + '</label>' +
      '<input id="' + id + '" type="' + (type || 'text') + '" value="' + escapeHTML(value || '') + '" placeholder="' + escapeHTML(placeholder || '') + '"></div>';
  }
  function textArea(id, label, value, placeholder) {
    return '<div class="input-group"><label for="' + id + '">' + escapeHTML(label) + '</label>' +
      '<textarea id="' + id + '" placeholder="' + escapeHTML(placeholder || '') + '">' + escapeHTML(value || '') + '</textarea></div>';
  }
  function select(id, label, items, selected) {
    return '<div class="input-group"><label for="' + id + '">' + escapeHTML(label) + '</label><select id="' + id + '">' +
      items.map(function (item) {
        const value = typeof item === 'string' ? item : item.id;
        const text = typeof item === 'string' ? item : item.label;
        const isSelected = selected === value || selected === text ? ' selected' : '';
        return '<option value="' + escapeHTML(value) + '"' + isSelected + '>' + escapeHTML(text) + '</option>';
      }).join('') + '</select></div>';
  }
  function summaryLine(label, value, className) {
    return '<div class="summary-line ' + (className || '') + '"><span>' + escapeHTML(label) + '</span><strong>' + escapeHTML(value) + '</strong></div>';
  }
  function timeline(steps, current) {
    return '<div class="timeline-card"><div class="timeline">' + steps.map(function (step, index) {
      const stateClass = index < current ? 'done' : (index === current ? 'current' : '');
      const statusText = index < current ? 'Done' : (index === current ? 'Current status' : 'Waiting');
      return '<div class="timeline-step ' + stateClass + '"><div class="step-dot">' + (index < current ? '✓' : index + 1) + '</div>' +
        '<div class="step-content"><strong>' + escapeHTML(step) + '</strong><span>' + statusText + '</span></div></div>';
    }).join('') + '</div></div>';
  }
  function requireUser() {
    if (!state.activeUser) {
      window.HopprRouter.go('auth');
      return false;
    }
    return true;
  }
  function shell(title, subtitle, content) {
    return '<div class="stack"><div class="hero-card"><h2>' + escapeHTML(title) + '</h2><p>' + escapeHTML(subtitle) + '</p></div>' + content + '</div>';
  }

  window.HopprState = state;
  window.HopprUI = { el, qs, qsa, money, escape: escapeHTML, createId, validUtmEmail, setTitle, toast, map, input, textArea, select, summaryLine, timeline, requireUser, shell };
})();
