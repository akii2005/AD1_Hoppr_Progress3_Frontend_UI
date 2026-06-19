(function () {
  const routes = {};

  function register(name, renderer) {
    routes[name] = renderer;
  }

  function updateActiveButtons(route) {
    window.HopprUI.qsa('[data-route]').forEach(function (button) {
      button.classList.toggle('active', button.getAttribute('data-route') === route);
    });
  }

  function go(route, params) {
    const renderer = routes[route];
    if (!renderer) {
      window.HopprUI.toast('Screen not found: ' + route, 'danger');
      return;
    }
    window.HopprState.previousRoute = window.HopprState.currentRoute;
    window.HopprState.currentRoute = route;
    window.HopprUI.setTitle(route);
    window.HopprUI.el('app').innerHTML = renderer(params || {});
    updateActiveButtons(route);
    if (typeof window.HopprBinders[route] === 'function') {
      window.HopprBinders[route](params || {});
    }
  }

  function back() {
    const previous = window.HopprState.previousRoute || 'home';
    if (previous === window.HopprState.currentRoute) {
      go('home');
    } else {
      go(previous);
    }
  }

  window.HopprBinders = {};
  window.HopprRouter = { register, go, back };
})();
