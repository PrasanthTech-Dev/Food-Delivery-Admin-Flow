// Comprehensive realistic mock data for BiteFlow Food Delivery Admin Dashboard

export const initialStats = {
  totalRevenue: 284590.50,
  revenueChange: +14.8,
  totalOrders: 18420,
  ordersChange: +8.4,
  activeUsers: 94230,
  usersChange: +12.3,
  avgDeliveryTime: "24.5 min",
  deliveryTimeChange: -3.2, // faster
  activeRiders: 342,
  activeRestaurants: 814,
  pendingRefunds: 9,
  openDisputes: 5,
  avgOrderValue: 42.80,
  orderFulfillmentRate: 99.2,
  customerSatisfaction: 4.88,
  activeCouriersOnRoad: 284,
};

export const sparklineStats = {
  revenue: [30, 34, 32, 38, 44, 41, 50, 57, 54],
  orders: [18, 22, 21, 26, 30, 29, 36, 40, 38],
  users: [82, 84, 85, 87, 89, 90, 92, 93, 95],
  deliveryTime: [29.4, 28.6, 28.1, 27.2, 26.5, 25.8, 25.2, 24.8, 24.5],
};

export const timeframeRevenueData = {
  Today: [
    { period: "08:00 AM", revenue: 4200, orders: 120, commission: 756 },
    { period: "10:00 AM", revenue: 8400, orders: 240, commission: 1512 },
    { period: "12:00 PM", revenue: 31200, orders: 890, commission: 5616 },
    { period: "02:00 PM", revenue: 21700, orders: 620, commission: 3906 },
    { period: "04:00 PM", revenue: 13300, orders: 380, commission: 2394 },
    { period: "06:00 PM", revenue: 26500, orders: 740, commission: 4770 },
    { period: "08:00 PM", revenue: 44800, orders: 1280, commission: 8064 },
    { period: "10:00 PM", revenue: 32900, orders: 940, commission: 5922 },
  ],
  "7D": [
    { period: "Mon", revenue: 28400, orders: 1820, commission: 5112 },
    { period: "Tue", revenue: 31200, orders: 2040, commission: 5616 },
    { period: "Wed", revenue: 34800, orders: 2310, commission: 6264 },
    { period: "Thu", revenue: 38900, orders: 2580, commission: 7002 },
    { period: "Fri", revenue: 47200, orders: 3190, commission: 8496 },
    { period: "Sat", revenue: 56400, orders: 3820, commission: 10152 },
    { period: "Sun", revenue: 52100, orders: 3540, commission: 9378 },
  ],
  "30D": [
    { period: "Week 1", revenue: 185400, orders: 12400, commission: 33372 },
    { period: "Week 2", revenue: 210200, orders: 14100, commission: 37836 },
    { period: "Week 3", revenue: 245800, orders: 16200, commission: 44244 },
    { period: "Week 4", revenue: 284590, orders: 18420, commission: 51226 },
  ],
  YTD: [
    { period: "Jan", revenue: 640000, orders: 42000, commission: 115200 },
    { period: "Feb", revenue: 720000, orders: 48000, commission: 129600 },
    { period: "Mar", revenue: 810000, orders: 53000, commission: 145800 },
    { period: "Apr", revenue: 790000, orders: 51000, commission: 142200 },
    { period: "May", revenue: 890000, orders: 58000, commission: 160200 },
    { period: "Jun", revenue: 950000, orders: 63000, commission: 171000 },
    { period: "Jul", revenue: 1040000, orders: 69000, commission: 187200 },
    { period: "Aug", revenue: 1120000, orders: 74000, commission: 201600 },
    { period: "Sep", revenue: 1190000, orders: 79000, commission: 214200 },
    { period: "Oct", revenue: 1284590, orders: 84200, commission: 231226 },
  ]
};

export const revenueChartData = timeframeRevenueData["7D"];

export const peakHourData = [
  { hour: "08:00 AM", orders: 120, label: "Breakfast Rush", riders: 140, surge: "1.0x", avgDelivery: "19m" },
  { hour: "10:00 AM", orders: 240, label: "Morning Snacks", riders: 180, surge: "1.0x", avgDelivery: "21m" },
  { hour: "12:00 PM", orders: 890, label: "Lunch Peak", riders: 310, surge: "1.3x", avgDelivery: "24m" },
  { hour: "02:00 PM", orders: 620, label: "Post-Lunch", riders: 260, surge: "1.1x", avgDelivery: "22m" },
  { hour: "04:00 PM", orders: 380, label: "Tea & Evening Bites", riders: 210, surge: "1.0x", avgDelivery: "20m" },
  { hour: "06:00 PM", orders: 740, label: "Early Dinner", riders: 290, surge: "1.2x", avgDelivery: "23m" },
  { hour: "08:00 PM", orders: 1280, label: "Dinner Prime Surge", riders: 342, surge: "1.4x", avgDelivery: "26m" },
  { hour: "10:00 PM", orders: 940, label: "Late Night Delivery", riders: 280, surge: "1.2x", avgDelivery: "24m" },
  { hour: "12:00 AM", orders: 310, label: "Midnight Cravings", riders: 150, surge: "1.1x", avgDelivery: "22m" },
];

export const foodCategoriesData = [
  { name: "Burgers & American Gourmet", share: 34, sales: "$96,760", growth: "+14.2%", color: "#ff6200" },
  { name: "Artisan Woodfired Pizza", share: 22, sales: "$62,600", growth: "+11.8%", color: "#0ea5e9" },
  { name: "Healthy Poke & Organic Bowls", share: 18, sales: "$51,220", growth: "+24.1%", color: "#10b981" },
  { name: "Authentic Ramen & Asian Wok", share: 14, sales: "$39,840", growth: "+18.5%", color: "#a78bfa" },
  { name: "Royal Indian & Biryani", share: 8, sales: "$22,760", growth: "+9.4%", color: "#f59e0b" },
  { name: "French Pastries & Desserts", share: 4, sales: "$11,410", growth: "+8.3%", color: "#ec4899" },
];

export const initialOrders = [
  {
    id: "ORD-9428",
    customer: { name: "Sophia Reynolds", phone: "+1 (555) 349-8120", address: "742 Evergreen Terr, Apt 4B, Metro City" },
    restaurant: { name: "Truffle & Flame Bistro", address: "148 Gourmet Ave, Downtown", rating: 4.8 },
    rider: { id: "RID-104", name: "Marcus Vance", phone: "+1 (555) 891-2301", vehicle: "E-Bike #42" },
    items: [
      { name: "Truffle Wagyu Burger", qty: 2, price: 24.50 },
      { name: "Parmesan Truffle Fries", qty: 1, price: 8.00 },
      { name: "Craft Iced Tea", qty: 2, price: 4.50 }
    ],
    subtotal: 66.00,
    deliveryFee: 3.99,
    platformFee: 2.50,
    tax: 5.60,
    discount: 5.00,
    total: 73.09,
    paymentMethod: "Apple Pay",
    paymentStatus: "Paid",
    status: "Active Delivery", // Pending, Confirmed, In Kitchen, Active Delivery, Delivered, Cancelled, Refund Requested
    placedAt: "12 mins ago",
    eta: "8 mins",
    timeline: [
      { step: "Order Placed", time: "11:15 AM", done: true },
      { step: "Restaurant Accepted", time: "11:17 AM", done: true },
      { step: "In Kitchen Prep", time: "11:21 AM", done: true },
      { step: "Rider Picked Up", time: "11:28 AM", done: true },
      { step: "Out for Delivery", time: "11:32 AM", done: true },
      { step: "Delivered", time: "Pending", done: false },
    ]
  },
  {
    id: "ORD-9427",
    customer: { name: "David Chen", phone: "+1 (555) 482-1940", address: "1024 Silicon Blvd, Tech District" },
    restaurant: { name: "Tokyo Ramen House", address: "88 Sakura Way, Midtown", rating: 4.9 },
    rider: { id: "RID-088", name: "Elena Rostova", phone: "+1 (555) 441-9922", vehicle: "Vespa Scooter" },
    items: [
      { name: "Signature Tonkotsu Ramen", qty: 2, price: 17.50 },
      { name: "Pan-Fried Gyoza (6 pcs)", qty: 1, price: 9.00 },
      { name: "Matcha Milk Tea", qty: 2, price: 5.50 }
    ],
    subtotal: 55.00,
    deliveryFee: 2.99,
    platformFee: 2.50,
    tax: 4.80,
    discount: 0.00,
    total: 65.29,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Confirmed",
    placedAt: "24 mins ago",
    eta: "18 mins",
    timeline: [
      { step: "Order Placed", time: "11:03 AM", done: true },
      { step: "Restaurant Accepted", time: "11:06 AM", done: true },
      { step: "In Kitchen Prep", time: "11:10 AM", done: true },
      { step: "Rider Assigned", time: "11:15 AM", done: true },
      { step: "Out for Delivery", time: "Pending", done: false },
      { step: "Delivered", time: "Pending", done: false },
    ]
  },
  {
    id: "ORD-9426",
    customer: { name: "Amina Al-Mansoor", phone: "+1 (555) 712-4091", address: "330 Harbor View, Pier 7" },
    restaurant: { name: "Napoli Woodfired Pizza", address: "55 Marina Blvd", rating: 4.7 },
    rider: null,
    items: [
      { name: "Margherita D.O.P.", qty: 1, price: 19.00 },
      { name: "Diavola Spicy Salami", qty: 1, price: 22.00 },
      { name: "Burrata & Prosciutto Salad", qty: 1, price: 14.50 }
    ],
    subtotal: 55.50,
    deliveryFee: 4.50,
    platformFee: 2.50,
    tax: 5.10,
    discount: 10.00,
    total: 57.60,
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    status: "Pending",
    placedAt: "4 mins ago",
    eta: "35 mins",
    timeline: [
      { step: "Order Placed", time: "11:23 AM", done: true },
      { step: "Restaurant Accepted", time: "Pending", done: false },
      { step: "In Kitchen Prep", time: "Pending", done: false },
      { step: "Rider Assigned", time: "Pending", done: false },
      { step: "Out for Delivery", time: "Pending", done: false },
      { step: "Delivered", time: "Pending", done: false },
    ]
  },
  {
    id: "ORD-9425",
    customer: { name: "Lucas Rodriguez", phone: "+1 (555) 902-1133", address: "818 Oakwood Pines, Westside" },
    restaurant: { name: "Green Garden Bowls", address: "302 Eco Plaza, Uptown", rating: 4.6 },
    rider: { id: "RID-112", name: "Liam O'Connor", phone: "+1 (555) 231-8844", vehicle: "E-Scooter" },
    items: [
      { name: "Spicy Salmon Poke Bowl", qty: 2, price: 18.00 },
      { name: "Cold-Pressed Detox Juice", qty: 2, price: 6.50 }
    ],
    subtotal: 49.00,
    deliveryFee: 3.50,
    platformFee: 2.50,
    tax: 4.30,
    discount: 0.00,
    total: 59.30,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Delivered",
    placedAt: "58 mins ago",
    eta: "Delivered",
    timeline: [
      { step: "Order Placed", time: "10:29 AM", done: true },
      { step: "Restaurant Accepted", time: "10:31 AM", done: true },
      { step: "In Kitchen Prep", time: "10:35 AM", done: true },
      { step: "Rider Picked Up", time: "10:48 AM", done: true },
      { step: "Out for Delivery", time: "10:50 AM", done: true },
      { step: "Delivered", time: "11:14 AM", done: true },
    ]
  },
  {
    id: "ORD-9424",
    customer: { name: "Jessica Taylor", phone: "+1 (555) 629-3941", address: "19 Sunset Hills, Apt 12C" },
    restaurant: { name: "Bombay Spice House", address: "77 Curry Lane, Downtown", rating: 4.8 },
    rider: null,
    items: [
      { name: "Butter Chicken Masala", qty: 1, price: 18.50 },
      { name: "Garlic Naan Basket", qty: 2, price: 6.00 },
      { name: "Biryani Special", qty: 1, price: 19.50 }
    ],
    subtotal: 50.00,
    deliveryFee: 3.99,
    platformFee: 2.50,
    tax: 4.50,
    discount: 8.00,
    total: 52.99,
    paymentMethod: "Apple Pay",
    paymentStatus: "Refund Pending",
    status: "Refund Requested",
    placedAt: "1 hour ago",
    refundReason: "Incorrect item received; requested chicken tikka instead of butter chicken.",
    refundAmount: 52.99,
    timeline: [
      { step: "Order Placed", time: "10:15 AM", done: true },
      { step: "Dispute Opened", time: "11:05 AM", done: true },
      { step: "Admin Review", time: "In Progress", done: true },
      { step: "Settled", time: "Pending", done: false },
    ]
  },
  {
    id: "ORD-9423",
    customer: { name: "Brandon Cooper", phone: "+1 (555) 819-2751", address: "55 King Street, Penthouse 2" },
    restaurant: { name: "Prime Steak & Grill", address: "12 Financial Way", rating: 4.9 },
    rider: null,
    items: [
      { name: "Dry-Aged Ribeye 12oz", qty: 1, price: 48.00 },
      { name: "Lobster Mac & Cheese", qty: 1, price: 22.00 }
    ],
    subtotal: 70.00,
    deliveryFee: 5.00,
    platformFee: 2.50,
    tax: 6.50,
    discount: 0.00,
    total: 84.00,
    paymentMethod: "Credit Card",
    paymentStatus: "Cancelled",
    status: "Cancelled",
    placedAt: "2 hours ago",
    cancelReason: "Customer cancelled prior to restaurant kitchen prep.",
    timeline: [
      { step: "Order Placed", time: "09:30 AM", done: true },
      { step: "Cancelled", time: "09:34 AM", done: true },
    ]
  }
];

export const initialRestaurants = [
  {
    id: "REST-001",
    name: "Truffle & Flame Bistro",
    cuisine: "Gourmet American & Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    owner: "Chef Antoine Laurent",
    email: "antoine@truffleflame.com",
    phone: "+1 (555) 234-5678",
    address: "148 Gourmet Ave, Downtown",
    rating: 4.8,
    reviewsCount: 1420,
    totalRevenue: "$142,850",
    commissionRate: 18,
    status: "Approved", // Approved, Pending Verification, Suspended
    isOpen: true,
    operatingHours: "10:30 AM - 11:00 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A+" },
    deliveryRadiusKm: 8.5,
    menuCount: 38,
    categories: ["Burgers", "Sides", "Beverages", "Desserts"]
  },
  {
    id: "REST-002",
    name: "Tokyo Ramen House",
    cuisine: "Japanese Authentic Ramen",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    owner: "Kenji Takahashi",
    email: "kenji@tokyoramen.jp",
    phone: "+1 (555) 987-6543",
    address: "88 Sakura Way, Midtown",
    rating: 4.9,
    reviewsCount: 2890,
    totalRevenue: "$210,400",
    commissionRate: 15,
    status: "Approved",
    isOpen: true,
    operatingHours: "11:00 AM - 10:30 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A+" },
    deliveryRadiusKm: 10.0,
    menuCount: 42,
    categories: ["Ramen", "Appetizers", "Bao Buns", "Sake & Tea"]
  },
  {
    id: "REST-003",
    name: "Napoli Woodfired Pizza",
    cuisine: "Italian & Artisan Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    owner: "Matteo Rossi",
    email: "rossi@napolipizza.it",
    phone: "+1 (555) 443-2211",
    address: "55 Marina Blvd, Pier 4",
    rating: 4.7,
    reviewsCount: 980,
    totalRevenue: "$98,320",
    commissionRate: 17,
    status: "Approved",
    isOpen: false,
    operatingHours: "12:00 PM - 11:00 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A" },
    deliveryRadiusKm: 7.0,
    menuCount: 26,
    categories: ["Pizza", "Salads", "Calzones", "Gelato"]
  },
  {
    id: "REST-004",
    name: "Casa Del Taco Mexican Grill",
    cuisine: "Mexican Street Food",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&auto=format&fit=crop&q=80",
    owner: "Carlos Hernandez",
    email: "carlos@casadeltaco.com",
    phone: "+1 (555) 876-1234",
    address: "210 Fiesta Street, Westside",
    rating: 4.5,
    reviewsCount: 640,
    totalRevenue: "$54,190",
    commissionRate: 20,
    status: "Pending Verification",
    isOpen: true,
    operatingHours: "10:00 AM - 02:00 AM",
    documents: { fssai: "UNDER_REVIEW", taxCertificate: "PENDING", hygieneScore: "Pending Inspection" },
    deliveryRadiusKm: 9.0,
    menuCount: 30,
    categories: ["Tacos", "Burritos", "Quesadillas", "Churros"]
  },
  {
    id: "REST-005",
    name: "Sweet Craving Patisserie",
    cuisine: "French Desserts & Cafe",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    owner: "Claire Delacroix",
    email: "claire@sweetcraving.com",
    phone: "+1 (555) 332-9090",
    address: "404 Blossom Ave, Uptown",
    rating: 4.9,
    reviewsCount: 1840,
    totalRevenue: "$118,500",
    commissionRate: 16,
    status: "Approved",
    isOpen: true,
    operatingHours: "08:00 AM - 09:00 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A+" },
    deliveryRadiusKm: 6.5,
    menuCount: 34,
    categories: ["Pastries", "Cakes", "Macarons", "Artisan Coffee"]
  },
  {
    id: "REST-006",
    name: "Golden Dragon Dim Sum",
    cuisine: "Cantonese Dim Sum & Dumplings",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&auto=format&fit=crop&q=80",
    owner: "Master Chef Wei Zhang",
    email: "wei.zhang@goldendragondimsum.com",
    phone: "+1 (555) 678-9012",
    address: "72 Chinatown Blvd, Central",
    rating: 4.8,
    reviewsCount: 2150,
    totalRevenue: "$176,300",
    commissionRate: 15,
    status: "Approved",
    isOpen: true,
    operatingHours: "09:00 AM - 10:00 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A+" },
    deliveryRadiusKm: 11.0,
    menuCount: 48,
    categories: ["Dumplings", "Bao", "Noodles", "Dim Sum Platters"]
  },
  {
    id: "REST-007",
    name: "Bombay Spice House",
    cuisine: "Royal North Indian & Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
    owner: "Rajesh & Priya Sharma",
    email: "rajesh@bombayspicehouse.com",
    phone: "+1 (555) 789-0123",
    address: "77 Curry Lane, Downtown Hub",
    rating: 4.9,
    reviewsCount: 3410,
    totalRevenue: "$245,600",
    commissionRate: 16,
    status: "Approved",
    isOpen: true,
    operatingHours: "11:30 AM - 11:00 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A+" },
    deliveryRadiusKm: 12.0,
    menuCount: 52,
    categories: ["Biryani", "Curries", "Tandoor Kebabs", "Naan & Breads"]
  },
  {
    id: "REST-008",
    name: "The Green Bowl Organics",
    cuisine: "Healthy Bowls & Superfoods",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    owner: "Maya Lindqvist",
    email: "maya@thegreenbowl.org",
    phone: "+1 (555) 890-1234",
    address: "19 Eco Way, Innovation Park",
    rating: 4.6,
    reviewsCount: 820,
    totalRevenue: "$72,400",
    commissionRate: 18,
    status: "Approved",
    isOpen: true,
    operatingHours: "08:30 AM - 08:30 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A" },
    deliveryRadiusKm: 7.5,
    menuCount: 22,
    categories: ["Poke Bowls", "Warm Grain Bowls", "Cold Press Juices", "Smoothies"]
  },
  {
    id: "REST-009",
    name: "Bangkok Street Wok",
    cuisine: "Authentic Thai & Street Wok",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&auto=format&fit=crop&q=80",
    owner: "Somchai Prasert",
    email: "somchai@bangkokstreetwok.com",
    phone: "+1 (555) 901-2345",
    address: "31 Silk Road, Night Market Hub",
    rating: 4.7,
    reviewsCount: 1290,
    totalRevenue: "$114,900",
    commissionRate: 17,
    status: "Approved",
    isOpen: true,
    operatingHours: "11:00 AM - 11:30 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A" },
    deliveryRadiusKm: 9.5,
    menuCount: 36,
    categories: ["Pad Thai", "Tom Yum & Soups", "Curries", "Crispy Spring Rolls"]
  },
  {
    id: "REST-010",
    name: "Smokey Yard Texas BBQ",
    cuisine: "Texas Pitmaster Smoked BBQ",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    owner: "Big Hank Miller",
    email: "hank@smokeyyardbbq.com",
    phone: "+1 (555) 012-3456",
    address: "120 Smokehouse Trail, East River",
    rating: 4.8,
    reviewsCount: 1650,
    totalRevenue: "$168,200",
    commissionRate: 19,
    status: "Approved",
    isOpen: true,
    operatingHours: "12:00 PM - 10:00 PM",
    documents: { fssai: "VERIFIED", taxCertificate: "VERIFIED", hygieneScore: "A+" },
    deliveryRadiusKm: 10.5,
    menuCount: 28,
    categories: ["Smoked Brisket", "Pork Ribs", "BBQ Platters", "Comfort Sides"]
  },
  {
    id: "REST-011",
    name: "Bella Vista Pasta Bar",
    cuisine: "Handmade Artisanal Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80",
    owner: "Gianna Moretti",
    email: "gianna@bellavistapasta.it",
    phone: "+1 (555) 123-4567",
    address: "42 Piazza Lane, Old Town",
    rating: 4.6,
    reviewsCount: 730,
    totalRevenue: "$69,800",
    commissionRate: 18,
    status: "Pending Verification",
    isOpen: false,
    operatingHours: "01:00 PM - 10:30 PM",
    documents: { fssai: "UNDER_REVIEW", taxCertificate: "PENDING", hygieneScore: "Under Assessment" },
    deliveryRadiusKm: 8.0,
    menuCount: 24,
    categories: ["Handmade Pasta", "Ravioli", "Antipasto", "Tiramisu"]
  },
  {
    id: "REST-012",
    name: "Ocean Catch Seafood Grill",
    cuisine: "Mediterranean & Fresh Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
    owner: "Captain Nikos Katsaros",
    email: "nikos@oceancatchgrill.com",
    phone: "+1 (555) 234-8901",
    address: "8 Harbour Wharf, Seafront",
    rating: 4.4,
    reviewsCount: 510,
    totalRevenue: "$48,600",
    commissionRate: 20,
    status: "Suspended",
    isOpen: false,
    operatingHours: "12:00 PM - 11:00 PM",
    documents: { fssai: "EXPIRED", taxCertificate: "VERIFIED", hygieneScore: "B" },
    deliveryRadiusKm: 8.0,
    menuCount: 32,
    categories: ["Fresh Catch", "Grilled Salmon", "Calamari", "Seafood Platters"]
  }
];

export const initialMenuItems = [
  // REST-001 Truffle & Flame Bistro
  { id: "MENU-101", restaurantId: "REST-001", name: "Truffle Wagyu Burger", category: "Burgers", price: 24.50, discountPrice: 22.00, isAvailable: true, veg: false, rating: 4.9, ordersCount: 1420 },
  { id: "MENU-102", restaurantId: "REST-001", name: "Crispy Portobello Vegan Burger", category: "Burgers", price: 18.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.7, ordersCount: 610 },
  { id: "MENU-103", restaurantId: "REST-001", name: "Parmesan Truffle Fries", category: "Sides", price: 8.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.8, ordersCount: 2310 },
  { id: "MENU-104", restaurantId: "REST-001", name: "Smoked Bourbon BBQ Wings", category: "Sides", price: 13.50, discountPrice: 11.50, isAvailable: false, veg: false, rating: 4.6, ordersCount: 950 },

  // REST-002 Tokyo Ramen House
  { id: "MENU-201", restaurantId: "REST-002", name: "Signature Tonkotsu Ramen", category: "Ramen", price: 17.50, discountPrice: null, isAvailable: true, veg: false, rating: 5.0, ordersCount: 3120 },
  { id: "MENU-202", restaurantId: "REST-002", name: "Spicy Miso Vegan Ramen", category: "Ramen", price: 16.50, discountPrice: 14.50, isAvailable: true, veg: true, rating: 4.8, ordersCount: 1180 },
  { id: "MENU-203", restaurantId: "REST-002", name: "Pan-Fried Pork Gyoza", category: "Appetizers", price: 9.00, discountPrice: null, isAvailable: true, veg: false, rating: 4.9, ordersCount: 1890 },
  { id: "MENU-204", restaurantId: "REST-002", name: "Chashu Pork Belly Bao", category: "Bao Buns", price: 11.00, discountPrice: null, isAvailable: true, veg: false, rating: 4.7, ordersCount: 980 },

  // REST-003 Napoli Woodfired Pizza
  { id: "MENU-301", restaurantId: "REST-003", name: "Margherita D.O.P.", category: "Pizza", price: 19.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.9, ordersCount: 1940 },
  { id: "MENU-302", restaurantId: "REST-003", name: "Diavola Spicy Salami", category: "Pizza", price: 22.00, discountPrice: 19.50, isAvailable: true, veg: false, rating: 4.8, ordersCount: 1530 },
  { id: "MENU-303", restaurantId: "REST-003", name: "Quattro Formaggi & Honey", category: "Pizza", price: 23.50, discountPrice: null, isAvailable: true, veg: true, rating: 4.9, ordersCount: 1120 },

  // REST-004 Casa Del Taco Mexican Grill
  { id: "MENU-401", restaurantId: "REST-004", name: "Birria Street Tacos (3 pcs)", category: "Tacos", price: 15.00, discountPrice: 13.50, isAvailable: true, veg: false, rating: 4.9, ordersCount: 1680 },
  { id: "MENU-402", restaurantId: "REST-004", name: "Mission Carne Asada Burrito", category: "Burritos", price: 16.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.7, ordersCount: 1240 },
  { id: "MENU-403", restaurantId: "REST-004", name: "Cinnamon Sugar Churros", category: "Churros", price: 7.50, discountPrice: null, isAvailable: true, veg: true, rating: 4.8, ordersCount: 890 },

  // REST-005 Sweet Craving Patisserie
  { id: "MENU-501", restaurantId: "REST-005", name: "Artisanal French Macaron Box (6)", category: "Macarons", price: 18.00, discountPrice: 16.00, isAvailable: true, veg: true, rating: 5.0, ordersCount: 2450 },
  { id: "MENU-502", restaurantId: "REST-005", name: "Madagascar Vanilla Mille-Feuille", category: "Pastries", price: 12.50, discountPrice: null, isAvailable: true, veg: true, rating: 4.9, ordersCount: 1420 },
  { id: "MENU-503", restaurantId: "REST-005", name: "Belgian Chocolate Ganache Tart", category: "Cakes", price: 10.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.8, ordersCount: 980 },

  // REST-006 Golden Dragon Dim Sum
  { id: "MENU-601", restaurantId: "REST-006", name: "Steamed Prawn Har Gow (4 pcs)", category: "Dumplings", price: 9.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.9, ordersCount: 2200 },
  { id: "MENU-602", restaurantId: "REST-006", name: "Ibérico Pork Siu Mai", category: "Dumplings", price: 8.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.8, ordersCount: 1840 },
  { id: "MENU-603", restaurantId: "REST-006", name: "BBQ Roast Pork Char Siu Bao", category: "Bao", price: 7.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.7, ordersCount: 1390 },

  // REST-007 Bombay Spice House
  { id: "MENU-701", restaurantId: "REST-007", name: "Royal Hyderabadi Dum Biryani", category: "Biryani", price: 19.50, discountPrice: 17.50, isAvailable: true, veg: false, rating: 5.0, ordersCount: 3890 },
  { id: "MENU-702", restaurantId: "REST-007", name: "Old Delhi Butter Chicken Masala", category: "Curries", price: 18.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.9, ordersCount: 3210 },
  { id: "MENU-703", restaurantId: "REST-007", name: "Paneer Tikka Shashlik", category: "Tandoor Kebabs", price: 15.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.8, ordersCount: 1650 },
  { id: "MENU-704", restaurantId: "REST-007", name: "Garlic Butter Naan Basket", category: "Naan & Breads", price: 6.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.9, ordersCount: 4120 },

  // REST-008 The Green Bowl Organics
  { id: "MENU-801", restaurantId: "REST-008", name: "Wild Salmon Avocado Poke Bowl", category: "Poke Bowls", price: 18.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.8, ordersCount: 1120 },
  { id: "MENU-802", restaurantId: "REST-008", name: "Mediterranean Falafel Grain Bowl", category: "Warm Grain Bowls", price: 15.00, discountPrice: 13.50, isAvailable: true, veg: true, rating: 4.7, ordersCount: 940 },
  { id: "MENU-803", restaurantId: "REST-008", name: "Detox Green Cold-Pressed Juice", category: "Cold Press Juices", price: 6.50, discountPrice: null, isAvailable: true, veg: true, rating: 4.9, ordersCount: 1800 },

  // REST-009 Bangkok Street Wok
  { id: "MENU-901", restaurantId: "REST-009", name: "Classic Tiger Prawn Pad Thai", category: "Pad Thai", price: 16.50, discountPrice: null, isAvailable: true, veg: false, rating: 4.8, ordersCount: 1780 },
  { id: "MENU-902", restaurantId: "REST-009", name: "Spicy Coconut Tom Yum Soup", category: "Tom Yum & Soups", price: 14.00, discountPrice: 12.50, isAvailable: true, veg: false, rating: 4.9, ordersCount: 1350 },
  { id: "MENU-903", restaurantId: "REST-009", name: "Thai Green Chicken Curry", category: "Curries", price: 17.00, discountPrice: null, isAvailable: true, veg: false, rating: 4.7, ordersCount: 1210 },

  // REST-010 Smokey Yard Texas BBQ
  { id: "MENU-1001", restaurantId: "REST-010", name: "14-Hour Smoked Beef Brisket", category: "Smoked Brisket", price: 26.00, discountPrice: 23.50, isAvailable: true, veg: false, rating: 5.0, ordersCount: 1940 },
  { id: "MENU-1002", restaurantId: "REST-010", name: "Honey Glazed Baby Back Ribs", category: "Pork Ribs", price: 24.00, discountPrice: null, isAvailable: true, veg: false, rating: 4.9, ordersCount: 1620 },
  { id: "MENU-1003", restaurantId: "REST-010", name: "Cast Iron Skillet Cornbread", category: "Comfort Sides", price: 7.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.8, ordersCount: 1150 },

  // REST-011 Bella Vista Pasta Bar
  { id: "MENU-1101", restaurantId: "REST-011", name: "Truffle Tagliatelle with Wild Mushrooms", category: "Handmade Pasta", price: 21.00, discountPrice: null, isAvailable: true, veg: true, rating: 4.8, ordersCount: 880 },
  { id: "MENU-1102", restaurantId: "REST-011", name: "Lobster & Ricotta Ravioli", category: "Ravioli", price: 24.50, discountPrice: 22.00, isAvailable: true, veg: false, rating: 4.9, ordersCount: 710 },
  { id: "MENU-1103", restaurantId: "REST-011", name: "Classic Venetian Tiramisu", category: "Tiramisu", price: 8.50, discountPrice: null, isAvailable: true, veg: true, rating: 4.9, ordersCount: 1200 },

  // REST-012 Ocean Catch Seafood Grill
  { id: "MENU-1201", restaurantId: "REST-012", name: "Wood-Grilled Atlantic Salmon Fillet", category: "Grilled Salmon", price: 25.00, discountPrice: null, isAvailable: false, veg: false, rating: 4.7, ordersCount: 620 },
  { id: "MENU-1202", restaurantId: "REST-012", name: "Crispy Salt & Pepper Calamari", category: "Calamari", price: 14.50, discountPrice: 12.50, isAvailable: false, veg: false, rating: 4.6, ordersCount: 540 },
  { id: "MENU-1203", restaurantId: "REST-012", name: "Grand Mediterranean Seafood Platter", category: "Seafood Platters", price: 38.00, discountPrice: null, isAvailable: false, veg: false, rating: 4.8, ordersCount: 390 },
];

export const initialDeliveryPartners = [
  {
    id: "RID-104",
    name: "Marcus Vance",
    email: "marcus.v@riderfleet.com",
    phone: "+1 (555) 891-2301",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    vehicleType: "E-Bike",
    vehiclePlate: "EB-4092",
    status: "On Delivery", // Online, On Delivery, Offline, Pending Verification
    currentOrder: "ORD-9428",
    rating: 4.94,
    totalDeliveries: 1840,
    acceptanceRate: "98.2%",
    onTimeRate: "97.5%",
    todayEarnings: "$142.50",
    weeklyEarnings: "$890.00",
    documents: { license: "VERIFIED", insurance: "VERIFIED", bgCheck: "PASSED" },
    lat: 37.7749,
    lng: -122.4194,
    speed: "22 km/h"
  },
  {
    id: "RID-088",
    name: "Elena Rostova",
    email: "elena.r@riderfleet.com",
    phone: "+1 (555) 441-9922",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Scooter (Gas)",
    vehiclePlate: "NY-882-MK",
    status: "Online",
    currentOrder: null,
    rating: 4.88,
    totalDeliveries: 2310,
    acceptanceRate: "99.1%",
    onTimeRate: "96.8%",
    todayEarnings: "$118.00",
    weeklyEarnings: "$780.00",
    documents: { license: "VERIFIED", insurance: "VERIFIED", bgCheck: "PASSED" },
    lat: 37.7833,
    lng: -122.4167,
    speed: "0 km/h (idle)"
  },
  {
    id: "RID-112",
    name: "Liam O'Connor",
    email: "liam.oc@riderfleet.com",
    phone: "+1 (555) 231-8844",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Electric Scooter",
    vehiclePlate: "ES-1192",
    status: "Online",
    currentOrder: null,
    rating: 4.91,
    totalDeliveries: 940,
    acceptanceRate: "96.5%",
    onTimeRate: "95.0%",
    todayEarnings: "$85.00",
    weeklyEarnings: "$610.00",
    documents: { license: "VERIFIED", insurance: "VERIFIED", bgCheck: "PASSED" },
    lat: 37.7699,
    lng: -122.4467,
    speed: "18 km/h"
  },
  {
    id: "RID-129",
    name: "Darius Thorne",
    email: "darius.t@riderfleet.com",
    phone: "+1 (555) 776-5544",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Car / Sedan",
    vehiclePlate: "CA-924-PX",
    status: "Pending Verification",
    currentOrder: null,
    rating: 0.0,
    totalDeliveries: 0,
    acceptanceRate: "100%",
    onTimeRate: "100%",
    todayEarnings: "$0.00",
    weeklyEarnings: "$0.00",
    documents: { license: "UNDER_REVIEW", insurance: "SUBMITTED", bgCheck: "PENDING" },
    lat: 37.7600,
    lng: -122.4300,
    speed: "0 km/h"
  },
  {
    id: "RID-075",
    name: "Zoe Martinez",
    email: "zoe.m@riderfleet.com",
    phone: "+1 (555) 334-1189",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Motorcycle",
    vehiclePlate: "MC-7718",
    status: "Offline",
    currentOrder: null,
    rating: 4.79,
    totalDeliveries: 3120,
    acceptanceRate: "95.0%",
    onTimeRate: "94.2%",
    todayEarnings: "$0.00",
    weeklyEarnings: "$940.00",
    documents: { license: "VERIFIED", insurance: "VERIFIED", bgCheck: "PASSED" },
    lat: 37.7500,
    lng: -122.4200,
    speed: "0 km/h"
  }
];

export const initialCustomers = [
  {
    id: "CUST-4091",
    name: "Sophia Reynolds",
    email: "sophia.reynolds@example.com",
    phone: "+1 (555) 349-8120",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tier: "VIP Platinum",
    totalOrders: 64,
    lifetimeSpend: "$2,480.50",
    joinedDate: "Feb 14, 2024",
    status: "Active", // Active, Suspended, Flagged
    addresses: [
      { tag: "Home (Default)", address: "742 Evergreen Terr, Apt 4B, Metro City" },
      { tag: "Work", address: "350 Innovation Way, Floor 14" }
    ],
    complaintsCount: 0,
    loyaltyPoints: 3420,
    favoriteRestaurant: "Truffle & Flame Bistro"
  },
  {
    id: "CUST-4092",
    name: "David Chen",
    email: "david.c@example.com",
    phone: "+1 (555) 482-1940",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tier: "Gold Member",
    totalOrders: 38,
    lifetimeSpend: "$1,340.20",
    joinedDate: "Jun 02, 2024",
    status: "Active",
    addresses: [
      { tag: "Office", address: "1024 Silicon Blvd, Tech District" }
    ],
    complaintsCount: 1,
    loyaltyPoints: 1890,
    favoriteRestaurant: "Tokyo Ramen House"
  },
  {
    id: "CUST-4093",
    name: "Jessica Taylor",
    email: "jess.taylor@example.com",
    phone: "+1 (555) 629-3941",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    tier: "Silver Member",
    totalOrders: 14,
    lifetimeSpend: "$580.00",
    joinedDate: "Nov 19, 2024",
    status: "Flagged",
    addresses: [
      { tag: "Home", address: "19 Sunset Hills, Apt 12C" }
    ],
    complaintsCount: 3,
    loyaltyPoints: 420,
    favoriteRestaurant: "Bombay Spice House"
  },
  {
    id: "CUST-4094",
    name: "Brandon Cooper",
    email: "b.cooper@example.com",
    phone: "+1 (555) 819-2751",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    tier: "Bronze Member",
    totalOrders: 5,
    lifetimeSpend: "$290.00",
    joinedDate: "Jan 10, 2025",
    status: "Active",
    addresses: [
      { tag: "Apartment", address: "55 King Street, Penthouse 2" }
    ],
    complaintsCount: 0,
    loyaltyPoints: 150,
    favoriteRestaurant: "Prime Steak & Grill"
  }
];

export const initialTransactions = [
  {
    id: "TXN-88410",
    orderId: "ORD-9428",
    party: "Sophia Reynolds",
    type: "Customer Payment",
    gateway: "Apple Pay",
    grossAmount: 73.09,
    platformFee: 2.50,
    commissionAmount: 11.88,
    netPayable: 58.71,
    status: "Settled",
    timestamp: "12 mins ago"
  },
  {
    id: "TXN-88409",
    orderId: "ORD-9427",
    party: "David Chen",
    type: "Customer Payment",
    gateway: "Credit Card (Stripe)",
    grossAmount: 65.29,
    platformFee: 2.50,
    commissionAmount: 8.25,
    netPayable: 54.54,
    status: "Settled",
    timestamp: "24 mins ago"
  },
  {
    id: "TXN-88408",
    orderId: "SETTLE-REST-001",
    party: "Truffle & Flame Bistro",
    type: "Restaurant Weekly Settlement",
    gateway: "Direct Bank ACH",
    grossAmount: 8940.00,
    platformFee: 0.00,
    commissionAmount: 1609.20,
    netPayable: 7330.80,
    status: "Processed",
    timestamp: "Yesterday, 04:00 PM"
  },
  {
    id: "TXN-88407",
    orderId: "PAYOUT-RID-104",
    party: "Marcus Vance",
    type: "Delivery Partner Payout",
    gateway: "Instant Debit Push",
    grossAmount: 890.00,
    platformFee: 0.00,
    commissionAmount: 0.00,
    netPayable: 890.00,
    status: "Processed",
    timestamp: "Yesterday, 06:30 PM"
  },
  {
    id: "TXN-88406",
    orderId: "ORD-9418",
    party: "Alex Morgan",
    type: "Customer Payment",
    gateway: "Google Pay",
    grossAmount: 48.90,
    platformFee: 2.50,
    commissionAmount: 0.00,
    netPayable: 0.00,
    status: "Failed",
    failureReason: "Card Issuer Declined: Insufficient Funds",
    timestamp: "3 hours ago"
  }
];

export const initialCoupons = [
  {
    id: "CPN-01",
    code: "FEAST50",
    discountType: "Percentage",
    value: 50,
    minOrderValue: 40.00,
    maxDiscount: 25.00,
    usageLimit: 2000,
    usedCount: 1640,
    startDate: "2026-10-01",
    expiryDate: "2026-11-15",
    status: "Active",
    applicableCategory: "All Categories",
    targetTier: "All Customers"
  },
  {
    id: "CPN-02",
    code: "FREESHIP",
    discountType: "Free Delivery",
    value: 100, // 100% of delivery fee
    minOrderValue: 25.00,
    maxDiscount: 5.00,
    usageLimit: 5000,
    usedCount: 4210,
    startDate: "2026-10-10",
    expiryDate: "2026-12-31",
    status: "Active",
    applicableCategory: "All Categories",
    targetTier: "Gold & VIP"
  },
  {
    id: "CPN-03",
    code: "BURGERFEST",
    discountType: "Flat Amount",
    value: 10.00,
    minOrderValue: 35.00,
    maxDiscount: 10.00,
    usageLimit: 1000,
    usedCount: 890,
    startDate: "2026-10-15",
    expiryDate: "2026-11-01",
    status: "Active",
    applicableCategory: "Burgers & Fast Food",
    targetTier: "All Customers"
  },
  {
    id: "CPN-04",
    code: "WELCOME20",
    discountType: "Percentage",
    value: 20,
    minOrderValue: 20.00,
    maxDiscount: 15.00,
    usageLimit: 10000,
    usedCount: 8430,
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "Active",
    applicableCategory: "All Categories",
    targetTier: "New Users Only"
  }
];

export const initialDisputes = [
  {
    id: "TICK-701",
    orderId: "ORD-9424",
    customer: "Jessica Taylor",
    type: "Missing / Incorrect Item",
    priority: "High",
    status: "Under Review", // Open, Under Review, Resolved, Escalated
    assignedTo: "Sarah Jenkins (Support Lead)",
    createdAt: "1 hour ago",
    details: "Received Butter Chicken Masala instead of Chicken Tikka Dry. Customer requested refund of $18.50 or replacement item.",
    resolutionNotes: "Contacted restaurant kitchen staff; confirming order slip ticket."
  },
  {
    id: "TICK-702",
    orderId: "ORD-9411",
    customer: "Michael Scott",
    type: "Excessive Delivery Delay",
    priority: "Urgent",
    status: "Open",
    assignedTo: "Unassigned",
    createdAt: "35 mins ago",
    details: "Delivery took 68 minutes in heavy rain. Food arrived cold. Customer requesting $10 goodwill credit.",
    resolutionNotes: ""
  },
  {
    id: "TICK-703",
    orderId: "ORD-9390",
    customer: "Rachel Green",
    type: "Payment Deducted Twice",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "Devon Miller",
    createdAt: "Yesterday",
    details: "Card billed twice due to network timeout during gateway callback. Duplicate charge of $42.10 refunded back to customer via Stripe.",
    resolutionNotes: "Stripe reversal TXN-9941 succeeded. Informed customer via email & SMS."
  }
];

export const initialDeliveryZones = [
  { id: "ZONE-01", name: "Downtown Central Hub", polygonCode: "Z-DTWN", surgeMultiplier: 1.4, baseFee: 2.99, minDistanceKm: 1.0, activeRiders: 98, status: "High Demand (Surge Active)" },
  { id: "ZONE-02", name: "Tech Innovation District", polygonCode: "Z-TECH", surgeMultiplier: 1.2, baseFee: 2.99, minDistanceKm: 1.5, activeRiders: 74, status: "Normal" },
  { id: "ZONE-03", name: "North Bay & Waterfront", polygonCode: "Z-NBAY", surgeMultiplier: 1.0, baseFee: 3.49, minDistanceKm: 2.0, activeRiders: 45, status: "Normal" },
  { id: "ZONE-04", name: "Westside Suburbs & Hills", polygonCode: "Z-WEST", surgeMultiplier: 1.1, baseFee: 3.99, minDistanceKm: 2.5, activeRiders: 62, status: "Normal" },
];

export const initialAuditLogs = [
  { id: "LOG-551", actor: "Arjun MS (Super Admin)", action: "Approved Restaurant", target: "Sweet Craving Patisserie (REST-005)", ip: "192.168.1.104", time: "10 mins ago" },
  { id: "LOG-550", actor: "System Auto-Dispatcher", action: "Assigned Delivery", target: "ORD-9428 -> Marcus Vance (RID-104)", ip: "Server Worker #3", time: "14 mins ago" },
  { id: "LOG-549", actor: "Sarah Jenkins (Support Lead)", action: "Processed Refund", target: "ORD-9390 ($42.10)", ip: "192.168.1.88", time: "1 hour ago" },
  { id: "LOG-548", actor: "Finance Engine", action: "Generated Weekly Payout Batch", target: "142 Restaurants ($184,200.00)", ip: "Cron Daemon", time: "Yesterday, 04:00 PM" },
  { id: "LOG-547", actor: "Arjun MS (Super Admin)", action: "Updated Surge Multiplier", target: "Zone 01 Downtown (1.2x -> 1.4x)", ip: "192.168.1.104", time: "Yesterday, 07:30 PM" },
];

export const initialNotifications = [
  { id: "NOTIF-1", title: "Surge Pricing Triggered", desc: "High order density in Downtown Central Hub. 1.4x multiplier activated.", time: "8 mins ago", unread: true, type: "alert" },
  { id: "NOTIF-2", title: "New Partner Verification Request", desc: "Rider Darius Thorne (RID-129) uploaded driving license for review.", time: "25 mins ago", unread: true, type: "info" },
  { id: "NOTIF-3", title: "Settlement Batch Ready", desc: "Weekly payout of $184,200 for 142 restaurants ready for authorization.", time: "1 hour ago", unread: false, type: "success" },
  { id: "NOTIF-4", title: "Dispute Opened", desc: "Customer Jessica Taylor opened a ticket for ORD-9424.", time: "2 hours ago", unread: false, type: "warning" }
];
