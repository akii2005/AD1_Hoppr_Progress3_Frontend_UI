# Hoppr - Progress 3 Frontend UI Prototype

High-fidelity frontend UI prototype for **Hoppr / UTM Ride Hailing App** for Application Development Project 1, Progress 3.

## Live Preview

After uploading to GitHub, enable GitHub Pages from **Settings > Pages > Branch: main > /root**.

Example live link:

```text
https://YOUR-USERNAME.github.io/Hoppr_Progress3_REDO_Frontend_UI/
```

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Student Passenger | `student@student.utm.my` | `Password123` |
| Student Driver | `driver@student.utm.my` | `Password123` |
| Admin | `admin@utm.my` | `Password123` |

## Module to Frontend Script Mapping

<table>
  <tr>
    <th>Module</th>
    <th>Frontend Script</th>
  </tr>
  <tr>
    <td>User Registration, Login, Email Verification, Reset Password</td>
    <td><a href="js/auth.js">js/auth.js</a></td>
  </tr>
  <tr>
    <td>Profile Management and Settings</td>
    <td><a href="js/profile.js">js/profile.js</a></td>
  </tr>
  <tr>
    <td>Ride Booking, Fare Summary, Payment, Ride History</td>
    <td><a href="js/rides.js">js/rides.js</a></td>
  </tr>
  <tr>
    <td>Parcel Delivery and Food Delivery</td>
    <td><a href="js/delivery.js">js/delivery.js</a></td>
  </tr>
  <tr>
    <td>Driver Dashboard, Job Acceptance, Trip Completion, Earnings</td>
    <td><a href="js/driver.js">js/driver.js</a></td>
  </tr>
  <tr>
    <td>Admin User Verification, Activity Monitoring, Complaints</td>
    <td><a href="js/admin.js">js/admin.js</a></td>
  </tr>
  <tr>
    <td>Navigation and Screen Routing</td>
    <td><a href="js/router.js">js/router.js</a></td>
  </tr>
  <tr>
    <td>Application State, Sample Data, UTM Locations and Users</td>
    <td><a href="js/data.js">js/data.js</a></td>
  </tr>
  <tr>
    <td>Reusable UI Components and Helpers</td>
    <td><a href="js/utils.js">js/utils.js</a></td>
  </tr>
  <tr>
    <td>Home Dashboard and App Initialization</td>
    <td><a href="js/app.js">js/app.js</a></td>
  </tr>
</table>

## Project Alignment

This prototype follows the project files:

- **Proposal:** Hoppr / Campus Ride Sharing System with passenger, driver and admin actors.
- **Progress 1:** Software Requirement with use cases for authentication, profile, ride booking, payment, parcel delivery, food delivery, driver management and earnings.
- **Progress 2:** Software Design with frontend UI sections and the four core subsystems.
- **Progress 3 Guideline:** Working high-fidelity frontend UI prototype, GitHub source code, Trello update and video link.

## Included Screens

- Login
- Register
- Email verification
- Reset password
- Home dashboard
- Profile view/edit
- Settings with dark mode and notifications
- Ride booking
- Fare estimate
- Live ride tracking
- Payment confirmation
- Ride and delivery history
- Parcel delivery booking
- Food delivery order
- Delivery tracking
- Driver dashboard
- Driver online/offline toggle
- Accept / decline / complete job
- Earnings summary
- Admin user verification
- Admin activity monitoring
- Complaints and reports

## How to Run Locally

Open `index.html` directly in your browser, or run a small local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Submission Steps

1. Upload all files and folders to GitHub repository root.
2. Enable GitHub Pages.
3. Copy the GitHub repository link and live frontend UI link.
4. Update Trello with Progress 3 tasks.
5. Record the video showing the UI and Trello progress.
6. Paste the GitHub link and video link in the Progress 3 report front page.
