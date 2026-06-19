window.HopprRoutes = {};

window.HopprUI = {
  app() {
    return document.getElementById('app');
  },
  register(route, handler) {
    HopprRoutes[route] = handler;
  },
  go(route, params = {}) {
    HopprState.route = route;
    HopprState.params = params;
    this.render();
  },
  render() {
    const app = this.app();
    app.classList.toggle('dark', Boolean(HopprState.settings.darkMode));
    const handler = HopprRoutes[HopprState.route] || HopprRoutes.login;
    app.innerHTML = handler(HopprState.params || {});
  },
  escape(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  },
  money(value) {
    return `RM ${Number(value).toFixed(2)}`;
  },
  getUser() {
    return HopprState.currentUser || HopprState.users[0];
  },
  setUser(user) {
    HopprState.currentUser = user;
  },
  addNotification(text) {
    HopprState.notifications.unshift({ text, time: 'Just now' });
  },
  toast(message, type = 'info') {
    const app = this.app();
    const previous = app.querySelector('.toast');
    if (previous) previous.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    app.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  },
  back(defaultRoute = 'home') {
    this.go(defaultRoute);
  },
  shell(title, subtitle, content, active = 'home', opts = {}) {
    const user = this.getUser();
    const showNav = opts.nav !== false;
    const rightButton = opts.rightButton || `<button class="icon-btn" onclick="HopprUI.go('notifications')" aria-label="Notifications">🔔</button>`;
    return `
      <section class="screen">
        <header class="topbar">
          <button class="icon-btn" onclick="HopprUI.go('${opts.back || 'home'}')" aria-label="Back">${opts.backIcon || '‹'}</button>
          <div class="topbar-title">
            <h2>${this.escape(title)}</h2>
            <p>${this.escape(subtitle || user.email)}</p>
          </div>
          ${rightButton}
        </header>
        ${content}
      </section>
      ${showNav ? this.nav(active) : ''}
    `;
  },
  nav(active) {
    const navItems = [
      ['home', '🏠', 'Home'],
      ['ride', '🚕', 'Ride'],
      ['delivery', '📦', 'Deliver'],
      ['driver', '🧑‍✈️', 'Driver'],
      ['profile', '👤', 'Profile']
    ];
    return `
      <nav class="bottom-nav" aria-label="Main navigation">
        ${navItems.map(item => `
          <button class="${active === item[0] ? 'active' : ''}" onclick="HopprUI.go('${item[0]}')">
            <span>${item[1]}</span>${item[2]}
          </button>
        `).join('')}
      </nav>
    `;
  },
  logoBlock() {
    return `<div class="logo-pill"><img src="assets/hoppr-logo.svg" alt="Hoppr logo"></div>`;
  },
  input(id, label, type = 'text', value = '', placeholder = '', extra = '') {
    return `
      <div class="field">
        <label for="${id}">${label}</label>
        <input id="${id}" type="${type}" value="${this.escape(value)}" placeholder="${this.escape(placeholder)}" ${extra} />
      </div>
    `;
  },
  select(id, label, options, selected = '') {
    return `
      <div class="field">
        <label for="${id}">${label}</label>
        <select id="${id}">
          ${options.map(option => {
            const val = typeof option === 'string' ? option : option.value;
            const text = typeof option === 'string' ? option : option.label;
            return `<option value="${this.escape(val)}" ${String(val) === String(selected) ? 'selected' : ''}>${this.escape(text)}</option>`;
          }).join('')}
        </select>
      </div>
    `;
  },
  textArea(id, label, value = '', placeholder = '') {
    return `
      <div class="field">
        <label for="${id}">${label}</label>
        <textarea id="${id}" placeholder="${this.escape(placeholder)}">${this.escape(value)}</textarea>
      </div>
    `;
  },
  map(label = 'Live UTM Campus Map') {
    return `
      <div class="map-card" role="img" aria-label="Simulated campus map">
        <div class="map-road r1"></div><div class="map-road r2"></div><div class="map-road r3"></div>
        <div class="pin start"></div><div class="pin end"></div>
        <div class="driver-dot d1">🚕</div><div class="driver-dot d2">🏍️</div>
        <div class="map-label">${this.escape(label)}</div>
      </div>
    `;
  },
  timeline(status) {
    const steps = ['Requested', 'Accepted', 'On the way', 'Arrived', 'Completed'];
    const index = Math.max(0, steps.indexOf(status));
    return `<div class="progress-line">${steps.map((step, i) => `
      <div class="step ${i < index ? 'done' : i === index ? 'active' : ''}">
        <div class="step-dot">${i < index ? '✓' : i + 1}</div>
        <div><h4>${step}</h4><p>${i === index ? 'Current step' : i < index ? 'Done' : 'Waiting'}</p></div>
      </div>
    `).join('')}</div>`;
  },
  activeClass(route) {
    return HopprState.route === route ? 'active' : '';
  }
};
