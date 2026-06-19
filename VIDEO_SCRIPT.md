:root {
  --navy: #263a5c;
  --navy-2: #172238;
  --ink: #182034;
  --muted: #778099;
  --line: #e5e8f0;
  --paper: #ffffff;
  --canvas: #f5f7fb;
  --soft: #f0f4ff;
  --mint: #78f3c4;
  --mint-dark: #0fa982;
  --amber: #f4a236;
  --danger: #e25555;
  --success: #24a56f;
  --shadow: 0 24px 60px rgba(21, 32, 52, 0.18);
  --radius-xl: 28px;
  --radius-lg: 20px;
  --radius-md: 14px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  color: var(--ink);
  background:
    radial-gradient(circle at 12% 12%, rgba(120, 243, 196, .22), transparent 32%),
    radial-gradient(circle at 82% 8%, rgba(116, 50, 255, .18), transparent 30%),
    linear-gradient(135deg, #eef3ff 0%, #f9fbff 55%, #edf9f4 100%);
}

button, input, select, textarea { font: inherit; }
button { cursor: pointer; border: 0; }
a { color: inherit; }

.prototype-stage {
  min-height: 100%;
  display: grid;
  grid-template-columns: minmax(280px, 400px) 440px;
  justify-content: center;
  align-items: center;
  gap: 54px;
  padding: 36px;
}

.brief-panel { max-width: 390px; }
.brand-row { display: flex; gap: 16px; align-items: center; margin-bottom: 28px; }
.brand-logo { width: 72px; height: 72px; border-radius: 20px; box-shadow: 0 20px 40px rgba(36, 29, 74, .22); }
.eyebrow { margin: 0 0 4px; color: var(--mint-dark); text-transform: uppercase; font-size: 12px; letter-spacing: .12em; font-weight: 800; }
.brand-row h1 { margin: 0; font-size: 44px; letter-spacing: -.04em; color: var(--navy-2); }
.brand-row p:last-child { margin: 3px 0 0; color: var(--muted); }
.brief-card {
  background: rgba(255,255,255,.76);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.75);
  border-radius: 24px;
  padding: 18px 20px;
  margin-bottom: 14px;
  box-shadow: 0 14px 34px rgba(23, 34, 56, .08);
}
.brief-card h2 { margin: 0 0 10px; font-size: 16px; }
.brief-card p { margin: 7px 0; color: var(--muted); line-height: 1.45; }
.brief-card ul { padding-left: 18px; margin: 8px 0 0; color: var(--muted); line-height: 1.8; }
.brief-card.success { border-color: rgba(36, 165, 111, .24); background: rgba(230, 255, 245, .8); }
.brief-card small { color: var(--muted); }

.phone-shell {
  width: 414px;
  height: 896px;
  max-height: calc(100vh - 36px);
  border-radius: 46px;
  padding: 14px;
  background: linear-gradient(160deg, #101827, #2d3e62 52%, #0a1423);
  box-shadow: var(--shadow), inset 0 0 0 2px rgba(255,255,255,.06);
  position: relative;
  overflow: hidden;
}
.phone-shell::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 50%;
  width: 132px;
  height: 30px;
  border-radius: 0 0 18px 18px;
  background: #0d1424;
  transform: translateX(-50%);
  z-index: 20;
}
.phone-status {
  height: 34px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px 0 20px;
  font-weight: 700;
  font-size: 13px;
  position: relative;
  z-index: 30;
}
.phone-icons { letter-spacing: 2px; font-size: 10px; }
.app-root {
  height: calc(100% - 34px);
  border-radius: 34px;
  background: var(--canvas);
  overflow: hidden;
  position: relative;
}
.app-root.dark { background: #07101f; color: #edf4ff; }

.screen {
  height: 100%;
  overflow-y: auto;
  padding: 22px 20px 96px;
  scrollbar-width: none;
}
.screen::-webkit-scrollbar { display: none; }
.screen.auth { padding: 34px 28px; display: flex; flex-direction: column; justify-content: center; }

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}
.topbar-title h2 { margin: 0; font-size: 22px; letter-spacing: -.02em; }
.topbar-title p { margin: 4px 0 0; color: var(--muted); font-size: 13px; }
.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 15px;
  background: #fff;
  color: var(--navy);
  display: grid;
  place-items: center;
  box-shadow: 0 8px 22px rgba(24, 32, 52, .08);
}
.dark .icon-btn { background: #121d32; color: #eaf2ff; }

.logo-pill {
  width: 78px;
  height: 78px;
  border-radius: 25px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  background: linear-gradient(135deg, #7432ff, #15223b 52%, #0aae8e);
  box-shadow: 0 24px 60px rgba(64, 44, 148, .22);
}
.logo-pill img { width: 58px; height: 58px; }
.auth h1 { text-align: center; font-size: 28px; margin: 0; letter-spacing: -.04em; }
.auth .lead { text-align: center; color: var(--muted); margin: 8px 0 26px; }
.form-card {
  background: var(--paper);
  border-radius: var(--radius-xl);
  padding: 22px;
  box-shadow: 0 18px 45px rgba(32, 43, 72, .08);
  border: 1px solid rgba(255,255,255,.7);
}
.dark .form-card, .dark .card, .dark .metric-card, .dark .job-card, .dark .bottom-nav { background: #0f1a2d; border-color: #1f2e4b; color: #edf4ff; }
.field { margin-bottom: 14px; }
.field label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); font-weight: 700; margin-bottom: 7px; }
.field input, .field select, .field textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: #f8f9fd;
  padding: 14px 14px;
  border-radius: 14px;
  color: var(--ink);
  outline: none;
  transition: .2s;
}
.field textarea { min-height: 94px; resize: vertical; }
.dark .field input, .dark .field select, .dark .field textarea { background: #091426; border-color: #223150; color: #eff6ff; }
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--mint-dark); box-shadow: 0 0 0 4px rgba(120, 243, 196, .22); }
.link-btn { background: transparent; color: var(--amber); font-weight: 800; padding: 0; }
.primary-btn, .secondary-btn, .danger-btn, .ghost-btn {
  width: 100%;
  border-radius: 15px;
  padding: 14px 16px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.primary-btn { background: var(--navy); color: #fff; box-shadow: 0 12px 30px rgba(38, 58, 92, .22); }
.primary-btn:hover { transform: translateY(-1px); }
.secondary-btn { background: #eafcf5; color: var(--mint-dark); }
.danger-btn { background: #fff1f1; color: var(--danger); }
.ghost-btn { background: #f2f5fb; color: var(--navy); }
.dark .ghost-btn { background: #17243d; color: #edf4ff; }
.auth-footer { margin-top: 18px; text-align: center; color: var(--muted); font-size: 13px; }
.demo-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 12px; }
.demo-grid button { border-radius: 12px; padding: 10px 8px; font-size: 12px; font-weight: 800; background: #f1f5ff; color: var(--navy); }

.hero-card {
  background: linear-gradient(155deg, var(--navy), #172238 55%, #0aae8e);
  color: #fff;
  border-radius: 30px;
  padding: 22px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 18px 46px rgba(31, 44, 75, .2);
}
.hero-card::after {
  content: "";
  position: absolute;
  right: -42px;
  top: -40px;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: rgba(120, 243, 196, .18);
}
.hero-card h2 { margin: 0 0 8px; font-size: 24px; letter-spacing: -.03em; }
.hero-card p { margin: 0; color: rgba(255,255,255,.76); line-height: 1.55; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px; }
.hero-stat { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.15); border-radius: 18px; padding: 12px; }
.hero-stat strong { display: block; font-size: 18px; }
.hero-stat span { font-size: 12px; color: rgba(255,255,255,.72); }

.section-title { display: flex; justify-content: space-between; align-items: center; margin: 22px 2px 12px; }
.section-title h3 { margin: 0; font-size: 17px; }
.section-title small { color: var(--muted); }
.quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.quick-card, .card, .metric-card, .job-card {
  background: #fff;
  border: 1px solid rgba(255,255,255,.75);
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 12px 30px rgba(23, 34, 56, .07);
}
.quick-card { text-align: left; color: var(--ink); min-height: 128px; }
.dark .quick-card { background: #0f1a2d; color: #edf4ff; border-color: #1f2e4b; }
.quick-icon { width: 44px; height: 44px; border-radius: 16px; display: grid; place-items: center; background: var(--soft); margin-bottom: 16px; font-size: 22px; }
.quick-card h3 { margin: 0 0 6px; font-size: 15px; }
.quick-card p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.4; }

.map-card {
  height: 196px;
  border-radius: 28px;
  padding: 18px;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(255,255,255,.42) 1px, transparent 1px) 0 0/44px 44px,
    linear-gradient(0deg, rgba(255,255,255,.42) 1px, transparent 1px) 0 0/44px 44px,
    linear-gradient(135deg, #dff4ff, #e8fff6);
  border: 1px solid #d7eef0;
}
.dark .map-card { background:
    linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px) 0 0/44px 44px,
    linear-gradient(0deg, rgba(255,255,255,.06) 1px, transparent 1px) 0 0/44px 44px,
    linear-gradient(135deg, #0d1b31, #0b2c2c); border-color: #1f4150; }
.map-road { position: absolute; height: 10px; background: rgba(38,58,92,.15); border-radius: 30px; transform-origin: left center; }
.map-road.r1 { left: -20px; top: 86px; width: 250px; transform: rotate(-13deg); }
.map-road.r2 { left: 88px; top: 12px; width: 260px; transform: rotate(73deg); }
.map-road.r3 { right: -40px; bottom: 44px; width: 290px; transform: rotate(16deg); }
.pin { position: absolute; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: grid; place-items: center; box-shadow: 0 10px 20px rgba(23,34,56,.2); }
.pin::after { content: ""; width: 12px; height: 12px; background: #fff; border-radius: 50%; }
.pin.start { left: 56px; top: 84px; background: var(--mint-dark); }
.pin.end { right: 66px; top: 48px; background: var(--amber); }
.driver-dot { position: absolute; width: 28px; height: 28px; border-radius: 50%; background: var(--navy); color: #fff; display: grid; place-items: center; box-shadow: 0 10px 22px rgba(23,34,56,.25); }
.driver-dot.d1 { left: 148px; top: 74px; }
.driver-dot.d2 { right: 86px; bottom: 40px; background: #5b44d7; }
.map-label { position: absolute; left: 18px; bottom: 16px; background: rgba(255,255,255,.86); border-radius: 16px; padding: 9px 12px; font-size: 12px; font-weight: 800; box-shadow: 0 8px 20px rgba(23,34,56,.08); }
.dark .map-label { background: rgba(13,23,42,.86); }

.row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.stack { display: grid; gap: 12px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pill { display: inline-flex; align-items: center; gap: 6px; padding: 7px 10px; border-radius: 999px; background: #edf5ff; color: var(--navy); font-size: 12px; font-weight: 800; }
.pill.success { background: #e9fff5; color: var(--success); }
.pill.warning { background: #fff4e5; color: #b36d00; }
.pill.danger { background: #fff1f1; color: var(--danger); }
.dark .pill { background: #17243d; color: #eaf2ff; }
.metric-card strong { display: block; font-size: 20px; margin-bottom: 4px; }
.metric-card span { color: var(--muted); font-size: 12px; }
.card h3, .job-card h3 { margin: 0 0 8px; }
.card p, .job-card p { margin: 5px 0; color: var(--muted); font-size: 13px; line-height: 1.45; }
.avatar {
  width: 56px; height: 56px; border-radius: 20px; display: grid; place-items: center; background: linear-gradient(135deg, var(--navy), #0aae8e); color: #fff; font-weight: 900; font-size: 20px;
}
.progress-line { display: grid; gap: 12px; margin: 10px 0; }
.step { display: grid; grid-template-columns: 32px 1fr; gap: 10px; align-items: start; }
.step-dot { width: 28px; height: 28px; border-radius: 50%; background: #e9eef8; color: var(--muted); display: grid; place-items: center; font-weight: 900; font-size: 12px; }
.step.done .step-dot { background: var(--mint); color: #08201a; }
.step.active .step-dot { background: var(--amber); color: #fff; box-shadow: 0 0 0 6px rgba(244,162,54,.17); }
.step h4 { margin: 0; font-size: 14px; }
.step p { margin: 2px 0 0; color: var(--muted); font-size: 12px; }
.amount { font-size: 28px; font-weight: 900; letter-spacing: -.04em; }
.fare-list { display: grid; gap: 10px; margin: 14px 0; }
.fare-list .row { padding-bottom: 10px; border-bottom: 1px dashed var(--line); color: var(--muted); }
.fare-list .row strong { color: var(--ink); }
.dark .fare-list .row strong { color: #edf4ff; }
.tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #e8edf7; padding: 5px; border-radius: 18px; margin-bottom: 14px; }
.tabs button { padding: 11px; border-radius: 14px; background: transparent; color: var(--muted); font-weight: 800; }
.tabs button.active { background: #fff; color: var(--navy); box-shadow: 0 8px 18px rgba(23,34,56,.08); }
.dark .tabs { background: #111c30; }
.dark .tabs button.active { background: #1c2a46; color: #eff6ff; }

.switch { width: 56px; height: 32px; padding: 4px; border-radius: 999px; background: #dce3ef; display: flex; align-items: center; transition: .2s; }
.switch span { width: 24px; height: 24px; background: #fff; border-radius: 50%; box-shadow: 0 3px 8px rgba(0,0,0,.14); transition: .2s; }
.switch.on { background: var(--amber); justify-content: flex-end; }
.notice {
  padding: 12px 14px;
  border-radius: 18px;
  background: #eefcf6;
  color: #0b674d;
  font-size: 13px;
  line-height: 1.45;
  border: 1px solid #c9f4e3;
}
.notice.warning { background: #fff6e8; color: #875101; border-color: #f7dfb7; }
.notice.danger { background: #fff1f1; color: #9a2d2d; border-color: #ffd0d0; }
.toast {
  position: absolute;
  z-index: 60;
  left: 20px; right: 20px; top: 20px;
  background: #111a2c;
  color: #fff;
  padding: 13px 15px;
  border-radius: 16px;
  box-shadow: 0 12px 34px rgba(23,34,56,.22);
  animation: slideDown .22s ease;
  font-size: 13px;
  font-weight: 700;
}
@keyframes slideDown { from { transform: translateY(-12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.bottom-nav {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  height: 70px;
  border-radius: 24px;
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(18px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
  padding: 8px;
  box-shadow: 0 18px 46px rgba(23,34,56,.16);
  border: 1px solid rgba(255,255,255,.84);
}
.bottom-nav button {
  border-radius: 18px;
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 800;
}
.bottom-nav button span { font-size: 20px; line-height: 1; }
.bottom-nav button.active { background: var(--navy); color: #fff; }

.empty-state { text-align: center; padding: 28px 18px; color: var(--muted); }
.empty-state .big { font-size: 44px; display: block; margin-bottom: 8px; }
.rating { display: grid; grid-template-columns: repeat(5, 1fr); gap: 7px; margin: 12px 0 16px; }
.rating button { padding: 12px 0; border-radius: 14px; background: #fff5e7; color: #bf7504; font-size: 20px; }
.profile-cover { height: 96px; border-radius: 28px 28px 8px 8px; background: linear-gradient(135deg, var(--navy), #6c50f7, #0aae8e); }
.profile-card { margin-top: -38px; text-align: center; }
.profile-card .avatar { margin: 0 auto 12px; width: 78px; height: 78px; border-radius: 28px; border: 5px solid #fff; }
.dark .profile-card .avatar { border-color: #0f1a2d; }

@media (max-width: 880px) {
  .prototype-stage { grid-template-columns: 1fr; gap: 22px; padding: 20px; }
  .brief-panel { display: none; }
  .phone-shell { margin: auto; width: min(414px, 100vw - 24px); height: min(896px, 100vh - 24px); }
}
