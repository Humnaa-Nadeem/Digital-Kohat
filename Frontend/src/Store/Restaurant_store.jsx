// src/Store/Restaurant_store.js
import { FaUtensils, FaCoffee, FaPizzaSlice, FaHamburger } from "react-icons/fa";

/* -----------------------------
  HOMEPAGE CATEGORY CARDS
-------------------------------- */
export const restaurantCategories = [
  { 
    icon: <FaUtensils />, 
    title: "Fine Dining", 
    description: "Experience premium dining with exquisite cuisines.", 
    link: "/restaurants/fine-dining", 
    btn: "View Restaurants" 
  },
  { 
    icon: <FaCoffee />, 
    title: "Cafes & Coffee Shops", 
    description: "Relax and enjoy the best coffee and desserts.", 
    link: "/restaurants/cafes", 
    btn: "View Cafes" 
  },
  { 
    icon: <FaPizzaSlice />, 
    title: "Fast Food", 
    description: "Quick bites and tasty fast food options.", 
    link: "/restaurants/fast-food", 
    btn: "View Fast Food" 
  },
  { 
    icon: <FaHamburger />, 
    title: "Local Cuisine", 
    description: "Explore traditional and local flavors of Kohat.", 
    link: "/restaurants/local", 
    btn: "View Local" 
  },
];

/* -----------------------------
  LANDING PAGE DATA TEMPLATE
-------------------------------- */
const createRestaurantData = ({ id, name, type, tagline, about, aboutImage, staff, menu, gallery, contact, quickInfo }) => ({
  id,
  name,
  type,
  tagline,
  about,
  aboutImage,
  staff,
  menu,
  gallery,
  contact,
  quickInfo
});

/* -----------------------------
  RESTAURANT LIST
-------------------------------- */
export const RestaurantsList = [
  { id: 1, name: "Pearl Restaurant" },
  { id: 2, name: "Kohat Cafe" },
  { id: 3, name: "Spice Villa" }
];

/* -----------------------------
  RESTAURANT CARDS DATA
-------------------------------- */
export const RestaurantsCardsData = [
  createRestaurantData({
    id: 1,
    name: "Pearl Restaurant",
    type: "Fine Dining",
    tagline: "Elegant dining experience with a variety of cuisines.",
    about: "Pearl Restaurant offers local and international dishes in a classy ambiance. Perfect for families and business dinners.",
    aboutImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    staff: [
      { name: "Chef John", image: "https://randomuser.me/api/portraits/men/32.jpg", description: "Head Chef" }
    ],
    menu: ["Grilled Salmon", "Beef Steak", "Pasta Carbonara", "Special Desserts"],
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
    ],
    contact: { email: "info@pearlrestaurant.com", phone: "+92 300 6667788", website: "https://pearlrestaurant.com" },
    quickInfo: {
      facilities: ["Indoor Seating", "Wi-Fi", "Air Conditioning"],
      extraActivities: ["Live Music Nights", "Cooking Workshops"],
      parentReviews: ["Amazing food!", "Lovely ambiance!"]
    }
  }),
  createRestaurantData({
    id: 2,
    name: "Kohat Cafe",
    type: "Cafe",
    tagline: "Chill and enjoy coffee with snacks.",
    about: "Kohat Cafe serves fresh coffee, sandwiches, and pastries. A perfect place for casual hangouts and work.",
    aboutImage: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    staff: [
      { name: "Barista: Sarah", image: "https://randomuser.me/api/portraits/women/45.jpg", description: "Coffee Specialist" }
    ],
    menu: ["Espresso", "Cappuccino", "Cheesecake", "Sandwiches"],
    gallery: [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    ],
    contact: { email: "contact@kohatcafe.com", phone: "+92 300 7778899", website: "https://kohatcafe.com" },
    quickInfo: {
      facilities: ["Indoor Seating", "Wi-Fi", "Outdoor Seating"],
      extraActivities: ["Board Games", "Live Music"],
      parentReviews: ["Great coffee!", "Cozy and relaxing atmosphere."]
    }
  }),
  createRestaurantData({
    id: 3,
    name: "Spice Villa",
    type: "Local Cuisine",
    tagline: "Traditional flavors of Kohat.",
    about: "Spice Villa is known for authentic local dishes. Enjoy a rich culinary experience with family and friends.",
    aboutImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    staff: [
      { name: "Chef Ali", image: "https://randomuser.me/api/portraits/men/33.jpg", description: "Master of local cuisine" }
    ],
    menu: ["Karahi Chicken", "Mutton Pulao", "Chapli Kebabs", "Traditional Sweets"],
    gallery: [
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7"
    ],
    contact: { email: "info@spicevilla.com", phone: "+92 300 8889900", website: "https://spicevilla.com" },
    quickInfo: {
      facilities: ["Family Seating", "Parking Available"],
      extraActivities: ["Cooking Classes", "Food Tasting Events"],
      parentReviews: ["Best local food!", "Highly recommended!"]
    }
  }),
];
