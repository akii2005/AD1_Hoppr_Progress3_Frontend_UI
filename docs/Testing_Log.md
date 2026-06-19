# Frontend Prototype Testing Log

| Test Area | Test Case | Expected Result | Status |
|---|---|---|---|
| Index file | Open `index.html` in browser | UI loads instead of raw JavaScript | Passed |
| Login | Use `student@student.utm.my` and `Password123` | Navigate to dashboard | Passed |
| Register | Use valid UTM email and 8+ character password | Create account and move to verification | Passed |
| Register validation | Use non-UTM email | Error message appears | Passed |
| Reset Password | Use code `123456` | Return to login after reset | Passed |
| Profile | Edit name/phone/faculty | Profile updates and reloads | Passed |
| Theme | Toggle dark mode | UI switches theme | Passed |
| Ride Booking | Choose pickup, destination, vehicle and tier | Fare estimate updates | Passed |
| Ride Request | Confirm ride | Active ride is created and tracking opens | Passed |
| Ride Tracking | Click next status | Timeline updates until completed | Passed |
| Payment | Confirm payment method | Payment recorded and history opens | Passed |
| Parcel Delivery | Enter parcel details | Tracking code is generated | Passed |
| Food Delivery | Enter food order | Food tracking screen opens | Passed |
| Driver Dashboard | Accept/decline available jobs | Job lists update | Passed |
| Complete Trip | Complete accepted driver job | Earnings and history update | Passed |
| Admin | Approve/suspend users | User status changes | Passed |
| Responsive UI | View on desktop and mobile width | Layout adapts correctly | Passed |
