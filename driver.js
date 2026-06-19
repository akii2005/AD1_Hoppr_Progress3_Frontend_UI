window.HopprAuth = {
  isUtmEmail(email) {
    return /@(student\.utm\.my|graduate\.utm\.my|utm\.my)$/i.test(email.trim());
  },
  login(role = null) {
    const email = document.getElementById('loginEmail')?.value.trim() || 'ahmad@student.utm.my';
    const password = document.getElementById('loginPassword')?.value || 'password123';
    if (!this.isUtmEmail(email)) return HopprUI.toast('Please use a valid UTM email address.', 'danger');
    if (password.length < 8) return HopprUI.toast('Password must be at least 8 characters long.', 'danger');
    let user = HopprState.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      const derivedRole = role || (email.includes('admin') ? 'admin' : email.includes('driver') ? 'driver' : 'student');
      user = {
        name: derivedRole === 'admin' ? 'Admin Officer' : derivedRole === 'driver' ? 'Student Driver' : 'Ahmed Kamal Ibrahim',
        email,
        phone: '+60 12 345 6789',
        role: derivedRole,
        matric: derivedRole === 'admin' ? 'ADMIN-UTM' : 'A24CS4004',
        faculty: derivedRole === 'admin' ? 'UTM Mobility Office' : 'Faculty of Computing',
        degree: derivedRole === 'admin' ? 'System Administration' : 'Bachelor of Computer Science',
        verified: true
      };
      HopprState.users.push(user);
    }
    if (role) user.role = role;
    HopprUI.setUser(user);
    HopprUI.addNotification(`Logged in successfully as ${user.role}.`);
    HopprUI.go(user.role === 'admin' ? 'admin' : 'home');
  },
  demo(role) {
    const account = role === 'admin' ? 'admin@utm.my' : role === 'driver' ? 'driver@student.utm.my' : 'ahmad@student.utm.my';
    const user = HopprState.users.find(u => u.email === account);
    HopprUI.setUser(user);
    HopprUI.go(role === 'admin' ? 'admin' : 'home');
  },
  register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    if (!name || !email || !phone) return HopprUI.toast('Please fill in all required fields.', 'danger');
    if (!this.isUtmEmail(email)) return HopprUI.toast('Please use a valid UTM email address.', 'danger');
    if (password.length < 8) return HopprUI.toast('Password must be at least 8 characters long.', 'danger');
    const user = { name, email, phone, role: 'student', matric: 'A24CS4004', faculty: 'Faculty of Computing', degree: 'Bachelor of Computer Science', verified: false };
    HopprUI.setUser(user);
    HopprState.users.push(user);
    HopprUI.go('verify');
  },
  verify() {
    const code = document.getElementById('verifyCode').value.trim();
    if (code.length < 6) return HopprUI.toast('Enter the 6-digit verification code.', 'danger');
    HopprState.currentUser.verified = true;
    HopprUI.addNotification('Your UTM email account is verified successfully.');
    HopprUI.go('home');
  },
  resetPassword() {
    const email = document.getElementById('resetEmail').value.trim();
    if (!this.isUtmEmail(email)) return HopprUI.toast('Enter your registered UTM email.', 'danger');
    HopprUI.toast('Verification code sent to your UTM email.');
    HopprUI.go('newPassword', { email });
  },
  updatePassword() {
    const code = document.getElementById('otpCode').value.trim();
    const password = document.getElementById('newPassword').value;
    if (code.length < 6) return HopprUI.toast('Invalid or expired code. Please request a new one.', 'danger');
    if (password.length < 8) return HopprUI.toast('Password must be at least 8 characters long.', 'danger');
    HopprUI.toast('Password reset successfully. Please log in.');
    HopprUI.go('login');
  }
};

HopprUI.register('login', () => `
  <section class="screen auth">
    ${HopprUI.logoBlock()}
    <h1>Welcome Back</h1>
    <p class="lead">Sign in using your verified UTM email account.</p>
    <div class="form-card">
      ${HopprUI.input('loginEmail', 'Email', 'email', 'ahmad@student.utm.my', 'your.name@student.utm.my')}
      <div class="field">
        <label for="loginPassword"><span>Password</span><button class="link-btn" onclick="HopprUI.go('reset')">Forgot Password?</button></label>
        <input id="loginPassword" type="password" value="password123" placeholder="••••••••" />
      </div>
      <button class="primary-btn" onclick="HopprAuth.login()">Log In</button>
      <div class="demo-grid">
        <button onclick="HopprAuth.demo('student')">Student</button>
        <button onclick="HopprAuth.demo('driver')">Driver</button>
        <button onclick="HopprAuth.demo('admin')">Admin</button>
      </div>
    </div>
    <p class="auth-footer">Don’t have an account? <button class="link-btn" onclick="HopprUI.go('register')">Sign Up</button></p>
  </section>
`);

HopprUI.register('register', () => `
  <section class="screen auth">
    ${HopprUI.logoBlock()}
    <h1>Create Account</h1>
    <p class="lead">Join the UTM ride community.</p>
    <div class="form-card">
      ${HopprUI.input('regName', 'Full Name', 'text', 'Ahmed Kamal Ibrahim', 'Enter full name')}
      ${HopprUI.input('regEmail', 'UTM Email', 'email', 'ahmad@student.utm.my', 'student@student.utm.my')}
      ${HopprUI.input('regPhone', 'Phone Number', 'tel', '+60 12 345 6789', '+60 12 345 6789')}
      ${HopprUI.input('regPassword', 'Password', 'password', 'password123', 'Minimum 8 characters')}
      <button class="primary-btn" onclick="HopprAuth.register()">Sign Up</button>
    </div>
    <p class="auth-footer">Already have an account? <button class="link-btn" onclick="HopprUI.go('login')">Log In</button></p>
  </section>
`);

HopprUI.register('verify', () => `
  <section class="screen auth">
    ${HopprUI.logoBlock()}
    <h1>Verify Your Email</h1>
    <p class="lead">We sent a 6-digit verification code to your UTM email.</p>
    <div class="form-card">
      ${HopprUI.input('verifyCode', 'Verification Code', 'text', '123456', '000000', 'maxlength="6"')}
      <button class="primary-btn" onclick="HopprAuth.verify()">Verify Email</button>
      <button class="ghost-btn" style="margin-top:10px" onclick="HopprUI.toast('New verification code sent.')">Resend Code</button>
    </div>
    <p class="auth-footer"><button class="link-btn" onclick="HopprUI.go('login')">Back to Login</button></p>
  </section>
`);

HopprUI.register('reset', () => `
  <section class="screen auth">
    ${HopprUI.logoBlock()}
    <h1>Reset Password</h1>
    <p class="lead">Enter your registered UTM email to receive a verification code.</p>
    <div class="form-card">
      ${HopprUI.input('resetEmail', 'Email', 'email', 'ahmad@student.utm.my', 'your.name@student.utm.my')}
      <button class="primary-btn" onclick="HopprAuth.resetPassword()">Send Verification Code</button>
    </div>
    <p class="auth-footer"><button class="link-btn" onclick="HopprUI.go('login')">Back to Login</button></p>
  </section>
`);

HopprUI.register('newPassword', params => `
  <section class="screen auth">
    ${HopprUI.logoBlock()}
    <h1>Set New Password</h1>
    <p class="lead">Code sent to ${HopprUI.escape(params.email || 'your UTM email')}.</p>
    <div class="form-card">
      ${HopprUI.input('otpCode', 'Verification Code', 'text', '123456', '000000', 'maxlength="6"')}
      ${HopprUI.input('newPassword', 'New Password', 'password', 'newpass123', 'Minimum 8 characters')}
      <button class="primary-btn" onclick="HopprAuth.updatePassword()">Reset Password</button>
    </div>
  </section>
`);
