(function () {
  window.HopprData = {
    appName: 'Hoppr',
    projectTitle: 'UTM Ride Hailing App',
    team: [
      { name: 'Tanzid Uddin', matric: 'A24CS4035' },
      { name: 'Ahmed Kamal Ibrahim', matric: 'A24CS4004' }
    ],
    locations: [
      'Kolej Tun Razak',
      'Kolej Rahman Putra',
      'Kolej Tuanku Canselor',
      'Faculty of Computing',
      'UTM Library',
      'ArkED Meranti Food Court',
      'UTM Health Centre',
      'Dewan Sultan Iskandar',
      'Sports Centre',
      'Kolej 9 & 10'
    ],
    vendors: [
      'ArkED Meranti Food Court',
      'Kolej Tun Razak Cafe',
      'Cengal Cafeteria',
      'Kolej 9 Food Court',
      'Faculty of Computing Kiosk'
    ],
    vehicleTypes: [
      { id: 'bike', label: 'Bike', base: 1.2, minute: 0.16, note: 'Fast low-cost campus rides' },
      { id: 'car', label: 'Car', base: 2.5, minute: 0.22, note: 'Comfortable for long campus trips' }
    ],
    tiers: [
      { id: 'standard', label: 'Standard', multiplier: 1.0, note: 'Affordable student fare' },
      { id: 'express', label: 'Express', multiplier: 1.25, note: 'Priority nearby driver' },
      { id: 'night-safe', label: 'Night Safe', multiplier: 1.4, note: 'Extra trusted late-night option' }
    ],
    users: [
      {
        id: 1,
        name: 'Ahmad Bin Abdullah',
        email: 'student@student.utm.my',
        password: 'Password123',
        role: 'Student Passenger',
        phone: '+60 11 3456 7890',
        faculty: 'Faculty of Computing',
        degree: 'Bachelor of Computer Science',
        verified: true,
        status: 'Active'
      },
      {
        id: 2,
        name: 'Tanzid Uddin',
        email: 'driver@student.utm.my',
        password: 'Password123',
        role: 'Student Driver',
        phone: '+60 12 222 2045',
        faculty: 'Faculty of Computing',
        degree: 'Bachelor of Computer Science',
        verified: true,
        status: 'Active',
        vehicle: 'Perodua Myvi - JSR 2405'
      },
      {
        id: 3,
        name: 'Admin Supervisor',
        email: 'admin@utm.my',
        password: 'Password123',
        role: 'Admin',
        phone: '+60 7 555 0190',
        faculty: 'Faculty of Computing',
        degree: 'System Management',
        verified: true,
        status: 'Active'
      }
    ],
    sampleJobs: [
      {
        id: 'R-1206', type: 'Ride', passenger: 'Aina Sofea', pickup: 'Kolej Tun Razak', dropoff: 'Faculty of Computing', fare: 4.8, distance: '2.1 km', eta: '4 min', status: 'Waiting'
      },
      {
        id: 'P-2204', type: 'Parcel', passenger: 'Muhammad Hafiz', pickup: 'UTM Library', dropoff: 'Kolej Rahman Putra', fare: 3.7, distance: '1.8 km', eta: '6 min', status: 'Waiting'
      },
      {
        id: 'F-3321', type: 'Food', passenger: 'Nur Alya', pickup: 'ArkED Meranti Food Court', dropoff: 'Kolej 9 & 10', fare: 5.2, distance: '2.7 km', eta: '8 min', status: 'Waiting'
      }
    ],
    complaints: [
      { id: 'C-1007', user: 'Student Passenger', issue: 'Driver arrived late', priority: 'Medium', status: 'Open' },
      { id: 'C-1010', user: 'Driver', issue: 'Passenger cancelled after arrival', priority: 'Low', status: 'Reviewing' }
    ]
  };
})();
