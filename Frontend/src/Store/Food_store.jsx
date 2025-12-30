import { FaUtensils, FaCoffee, FaPizzaSlice, FaHamburger, FaBirthdayCake, FaIceCream } from "react-icons/fa";

// ========================================
// FOOD CATEGORIES
// ========================================
export const Food_categories = [
    {
        title: "Fine Dining",
        img: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600",
        icon: <FaUtensils className="icons" />,
        btn: "Exquisite Dining",
        link: "/food/fine-dining",
        description: "Experience premium dining with exquisite cuisines and elegant atmosphere."
    },
    {
        title: "Cafes & Coffee",
        img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
        icon: <FaCoffee className="icons" />,
        btn: "Coffee Spots",
        link: "/food/cafes",
        description: "Relax and enjoy the best coffee, desserts, and cozy vibes."
    },
    {
        title: "Fast Food",
        img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
        icon: <FaPizzaSlice className="icons" />,
        btn: "Quick Bites",
        link: "/food/fast-food",
        description: "Delicious burgers, pizzas, and quick bites for your cravings."
    },
    {
        title: "Local Cuisine",
        img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
        icon: <FaHamburger className="icons" />,
        btn: "Traditional Food",
        link: "/food/local-food",
        description: "Explore the authentic flavors and traditional dishes of Kohat."
    },
    {
        title: "Bakeries",
        img: "https://images.pexels.com/photos/1739748/pexels-photo-1739748.jpeg?auto=compress&cs=tinysrgb&w=600",
        icon: <FaBirthdayCake className="icons" />,
        btn: "Sweet Delights",
        link: "/food/bakeries",
        description: "Freshly baked cakes, pastries, and traditional sweets."
    },
    {
        title: "Street Food",
        img: "https://images.pexels.com/photos/5412440/pexels-photo-5412440.jpeg?auto=compress&cs=tinysrgb&w=600",
        icon: <FaIceCream className="icons" />,
        btn: "Street Flavors",
        link: "/food/street-food",
        description: "Authentic street snacks and local favorites from the bazaar."
    },
];

// ========================================
// FINE DINING DATA
// ========================================
export const FineDiningList = [
    { name: "The Grand Regal", id: 1 },
    { name: "Royal Pavilion", id: 2 },
    { name: "Elite Restaurant", id: 3 },
];

export const FineDiningCardsData = [
    { img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "The Grand Regal", Desc: "Premium fine dining with a mix of continental and local dishes.", id: "1", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Royal Pavilion", Desc: "Exquisite ambiance and gourmet flavors for special occasions.", id: "2", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Elite Restaurant", Desc: "A sophisticated dining experience with top-notch service.", id: "3", btn_txt: "View Details" },
];

// ========================================
// CAFES DATA
// ========================================
export const CafesList = [
    { name: "Mountain Brew", id: 1 },
    { name: "Bean & Beyond", id: 2 },
    { name: "The Cozy Corner", id: 3 },
];

export const CafesCardsData = [
    { img: "https://images.pexels.com/photos/6067/coffee-flower-reading-magazine.jpg?auto=compress&cs=tinysrgb&w=600", InstName: "Mountain Brew", Desc: "Freshly brewed coffee with a stunning view of the hills.", id: "1", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Bean & Beyond", Desc: "The perfect spot for coffee lovers and dessert enthusiasts.", id: "2", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "The Cozy Corner", Desc: "A small, peaceful space for work or casual meetups.", id: "3", btn_txt: "View Details" },
];

// ========================================
// FAST FOOD DATA
// ========================================
export const FastFoodList = [
    { name: "Burger Hub", id: 1 },
    { name: "Pizza Palace", id: 2 },
    { name: "Crunchy Chicken", id: 3 },
];

export const FastFoodCardsData = [
    { img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Burger Hub", Desc: "Juicy burgers and crispy fries that will keep you coming back.", id: "1", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Pizza Palace", Desc: "Authentic wood-fired pizzas with a variety of toppings.", id: "2", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Crunchy Chicken", Desc: "The best fried chicken in town, crispy and flavorful.", id: "3", btn_txt: "View Details" },
];

// ========================================
// LOCAL FOOD DATA
// ========================================
export const LocalFoodList = [
    { name: "Kohat Chapli Kebab Central", id: 1 },
    { name: "Sulemani Pulao House", id: 2 },
    { name: "Traditional Shinwari BBQ", id: 3 },
];

export const LocalFoodCardsData = [
    { img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Kohat Chapli Kebab Central", Desc: "The most famous and authentic Chapli Kebabs in the region.", id: "1", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Sulemani Pulao House", Desc: "Traditional Pulao served with a unique Sulemani taste.", id: "2", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Traditional Shinwari BBQ", Desc: "Freshly prepared barbecue using traditional Shinwari recipes.", id: "3", btn_txt: "View Details" },
];

// ========================================
// BAKERIES DATA
// ========================================
export const BakeriesList = [
    { name: "Sweet Bake Studio", id: 1 },
    { name: "The Pastry Shop", id: 2 },
    { name: "Traditional Sweets Corner", id: 3 },
];

export const BakeriesCardsData = [
    { img: "https://images.pexels.com/photos/1739748/pexels-photo-1739748.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Sweet Bake Studio", Desc: "Custom cakes and premium pastries for all your celebrations.", id: "1", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "The Pastry Shop", Desc: "Freshly baked cookies, bread, and croissants every morning.", id: "2", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Traditional Sweets Corner", Desc: "Authentic local sweets and mithai made with pure ingredients.", id: "3", btn_txt: "View Details" },
];

// ========================================
// STREET FOOD DATA
// ========================================
export const StreetFoodList = [
    { name: "Bazaar Chaat Point", id: 1 },
    { name: "Golgappa Corner", id: 2 },
    { name: "Samosa & Pakora Stall", id: 3 },
];

export const StreetFoodCardsData = [
    { img: "https://images.pexels.com/photos/5412440/pexels-photo-5412440.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Bazaar Chaat Point", Desc: "Spicy and tangy chaat that captures the essence of street flavors.", id: "1", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/12419161/pexels-photo-12419161.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Golgappa Corner", Desc: "Crispy golgappas with a variety of spicy waters.", id: "2", btn_txt: "View Details" },
    { img: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Samosa & Pakora Stall", Desc: "The ultimate evening snacks, freshly fried and hot.", id: "3", btn_txt: "View Details" },
];

// ========================================
// FOOD DETAILS DATA
// ========================================
export const Food_Details = [
    {
        id: 1,
        type: "Fine Dining",
        name: "The Grand Regal",
        tagline: "Experience the Pinnacle of Dining",
        about: "The Grand Regal is Kohat's premier fine dining destination, offering an unparalleled culinary journey. Our chefs specialize in a fusion of continental masterpieces and refined local flavors, all served in an atmosphere of absolute elegance.",
        aboutImage: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
        staff: [
            { name: "Chef Haris", subject: "Executive Chef", description: "Master of continental cuisine.", image: "https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg" },
            { name: "Ms. Amna", subject: "Manager", description: "Expert in hospitality management.", image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg" }
        ],
        events: [
            { title: "Gourmet Week", description: "Special menu featuring international dishes.", icon: "FaUtensils" },
            { title: "Candlelight Dinner", description: "Exclusive evening for couples.", icon: "FaHeart" }
        ],
        quickInfo: {
            basicProfile: { name: "The Grand Regal", location: "Cantonment, Kohat", type: "Fine Dining" },
            administration: { owner: "Mr. Zahid Khan", phone: "0922-123456", email: "info@grandregal.com", website: "" },
            facilities: ["Private Cabins", "AC Hall", "Valet Parking", "Free Wi-Fi", "Event Hall"],
            timings: { timing: "12:00 PM – 12:00 AM", seasonalSchedules: true },
            extraActivities: ["Live Violin Performance", "Cooking Masterclasses"],
            parentReviews: ["Best fine dining in Kohat.", "Amazing atmosphere and food.", "Highly professional staff."]
        },
        gallery: [
            "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
            "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
        ],
        contact: { email: "contact@grandregal.com", phone: "+92 300 1234567", website: "" }
    },
    {
        id: 2,
        type: "Cafe",
        name: "Mountain Brew",
        tagline: "Coffee with a View",
        about: "Mountain Brew offers the perfect escape from the city hustle. Enjoy our artesanal coffee blends while taking in the breathtaking views of the Kohat hills.",
        aboutImage: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
        staff: [
            { name: "Zohaib", subject: "Head Barista", description: "Expert in latte art and bean roasting.", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" }
        ],
        events: [{ title: "Coffee Tasting", description: "Learn about different bean profiles.", icon: "FaCoffee" }],
        quickInfo: {
            basicProfile: { name: "Mountain Brew", location: "KDA Hills, Kohat", type: "Cafe" },
            administration: { owner: "Mr. Ali", phone: "0333-987654", email: "info@mountainbrew.com", website: "" },
            facilities: ["Outdoor Seating", "Free Wi-Fi", "Charging Ports", "Bookshelf"],
            timings: { timing: "8:00 AM – 11:00 PM", seasonalSchedules: false },
            extraActivities: ["Board Games Night", "Live Acoustic Music"],
            parentReviews: ["Best place to study and relax.", "The sunset view is incredible.", "Best cappuccino in Kohat."]
        },
        gallery: [
            "https://images.pexels.com/photos/6067/coffee-flower-reading-magazine.jpg",
            "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg"
        ],
        contact: { email: "visit@mountainbrew.com", phone: "+92 333 1122334", website: "" }
    },
    {
        id: 3,
        type: "Local Cuisine",
        name: "Kohat Chapli Kebab Central",
        tagline: "The Legend of Kohat",
        about: "Experience the authentic taste of Kohat with our world-famous Chapli Kebabs. We've been serving the same traditional recipe for decades.",
        aboutImage: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        staff: [
            { name: "Ustad Karim", subject: "Master Kebab Chef", description: "30 years of traditional cooking experience.", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" }
        ],
        events: [{ title: "Traditional Feast", description: "Special platter for families.", icon: "FaUtensils" }],
        quickInfo: {
            basicProfile: { name: "Kebab Central", location: "Main Bazaar, Kohat", type: "Local Food" },
            administration: { owner: "Karim Khan", phone: "0922-555666", email: "kebab@central.com", website: "" },
            facilities: ["Traditional Majlis Seating", "Takeaway Service", "Open Kitchen View"],
            timings: { timing: "3:00 PM – 1:00 AM", seasonalSchedules: true },
            extraActivities: ["Live Kebab Preparation", "Traditional Tea Service"],
            parentReviews: ["No one beats their taste.", "True pride of Kohat.", "Generous portions."]
        },
        gallery: [
            "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg",
            "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg"
        ],
        contact: { email: "orders@kebabcentral.com", phone: "+92 345 5556667", website: "" }
    }
];
