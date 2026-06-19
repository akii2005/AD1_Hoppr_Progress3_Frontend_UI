window.HopprState = {
  route: 'login',
  params: {},
  currentUser: null,
  settings: {
    darkMode: false,
    notifications: true
  },
  users: [
    {
      name: 'Ahmed Kamal Ibrahim',
      email: 'ahmad@student.utm.my',
      phone: '+60 12 345 6789',
      role: 'student',
      matric: 'A24CS4004',
      faculty: 'Faculty of Computing',
      degree: 'Bachelor of Computer Science',
      verified: true
    },
    {
      name: 'Student Driver',
      email: 'driver@student.utm.my',
      phone: '+60 11 2222 3030',
      role: 'driver',
      matric: 'A24CS4035',
      faculty: 'Faculty of Computing',
      degree: 'Bachelor of Computer Science',
      verified: true
    },
    {
      name: 'Admin Officer',
      email: 'admin@utm.my',
      phone: '+60 7 553 3333',
      role: 'admin',
      matric: 'ADMIN-UTM',
      faculty: 'UTM Mobility Office',
      degree: 'System Administration',
      verified: true
    }
  ],
  locations: [
    'Kolej Rahman Putra',
    'Faculty of Computing',
    'UTM Library',
    'Student Union Building',
    'Kolej Tun Razak',
    'Arked Meranti',
    'KTDI College',
    'Sports Centre',
    'UTM Mosque',
    'Senai Airport Gate Pickup'
  ],
  vendors: [
    'Arked Meranti Food Court',
    'KRP Cafeteria',
    'SUB Food Court',
    'KTDI Cafe',
    'Faculty of Computing Cafe'
  ],
  vehicleTypes: [
    { id: 'motor', label: 'Motorcycle', base: 2.50, eta: '3 min', icon: '🏍️' },
    { id: 'car', label: 'Car', base: 5.00, eta: '5 min', icon: '🚗' },
    { id: 'premium', label: 'Premium Car', base: 8.00, eta: '7 min', icon: '✨' }
  ],
  driverOnline: false,
  activeRide: null,
  rideHistory: [
    { id: 'R-2401', from: 'Kolej Rahman Putra', to: 'Faculty of Computing', fare: 4.80, status: 'Completed', date: 'Today, 8:20 AM', driver: 'Tanzid Uddin' },
    { id: 'R-2398', from: 'UTM Library', to: 'Kolej Tun Razak', fare: 3.40, status: 'Completed', date: 'Yesterday, 6:10 PM', driver: 'Aiman Hakim' }
  ],
  activeDelivery: null,
  deliveryOrders: [
    { id: 'P-1132', type: 'Parcel', from: 'Kolej Tun Razak', to: 'Faculty of Computing', status: 'Delivered', date: 'Yesterday', fee: 3.00 },
    { id: 'F-2081', type: 'Food', vendor: 'Arked Meranti Food Court', to: 'Kolej Rahman Putra', status: 'Delivered', date: '2 days ago', fee: 4.50 }
  ],
  availableJobs: [
    { id: 'J-881', type: 'Ride', pickup: 'UTM Library', dropoff: 'Kolej Rahman Putra', fare: 4.80, distance: '1.9 km', eta: '4 min', passenger: 'Nur Aisyah' },
    { id: 'J-882', type: 'Parcel', pickup: 'Kolej Tun Razak', dropoff: 'Faculty of Computing', fare: 3.50, distance: '1.4 km', eta: '3 min', passenger: 'Tan Wei Ming' },
    { id: 'J-883', type: 'Food', pickup: 'SUB Food Court', dropoff: 'KTDI College', fare: 5.20, distance: '2.6 km', eta: '6 min', passenger: 'Ahmed Kamal' }
  ],
  currentJob: null,
  earnings: [
    { id: 'E-551', label: 'Ride to Faculty of Computing', amount: 4.80, time: 'Today, 8:20 AM' },
    { id: 'E-550', label: 'Food delivery to KTDI', amount: 5.40, time: 'Yesterday, 7:35 PM' },
    { id: 'E-549', label: 'Parcel delivery to Library', amount: 3.20, time: 'Yesterday, 2:05 PM' }
  ],
  pendingDrivers: [
    { name: 'Muhammad Faris', email: 'faris@student.utm.my', matric: 'A24CS4120', vehicle: 'Car - VEX 2341', status: 'Pending' },
    { name: 'Lim Jia En', email: 'jiaen@student.utm.my', matric: 'A24CS4107', vehicle: 'Motorcycle - JQB 1198', status: 'Pending' }
  ],
  reports: [
    { id: 'C-101', title: 'Late pickup report', status: 'Open', priority: 'Medium' },
    { id: 'C-102', title: 'Incorrect drop-off point', status: 'Reviewing', priority: 'Low' }
  ],
  notifications: [
    { text: 'Driver arrived at Faculty of Computing pickup point.', time: '2 min ago' },
    { text: 'Your UTM email account is verified successfully.', time: 'Today' },
    { text: 'Payment record saved for ride R-2401.', time: 'Today' }
  ]
};

window.HopprHelpers = {
  calculateFare(distanceKm, vehicleId) {
    const vehicle = HopprState.vehicleTypes.find(v => v.id === vehicleId) || HopprState.vehicleTypes[0];
    const serviceFee = 0.80;
    return Number((vehicle.base + distanceKm * 0.9 + serviceFee).toFixed(2));
  },
  createId(prefix) {
    return `${prefix}-${Math.floor(1000 + Math.random() * 8999)}`;
  },
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  nowLabel() {
    return 'Just now';
  }
};
