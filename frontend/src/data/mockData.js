// Mock data for Costco Travel clone

export const treasureHuntDeals = [
  {
    id: 1,
    title: "Norwegian Cruise Line Exclusive Deals",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=80",
    benefits: [
      "Daily Gratuities or Shipboard Credit on Select Sailings",
      "Digital Costco Shop Card with Every Sailing"
    ],
    extrasValue: "$400"
  },
  {
    id: 2,
    title: "Hawaii Island: OUTRIGGER Kona Resort and Spa Club Package",
    image: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=400&h=300&fit=crop&q=80",
    benefits: [
      "Two Complimentary Luau Tickets",
      "Complimentary Valet Parking",
      "20% Discount on Wind Fair Cruises"
    ],
    extrasValue: "$400"
  },
  {
    id: 3,
    title: "Riviera Nayarit: Marival Distinct Package",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&q=80",
    benefits: [
      "All-Inclusive Resort",
      "Digital Costco Shop Card",
      "One-, Two- and Three-Bedroom Residences"
    ],
    extrasValue: "$200"
  }
];

export const whatsHotDeals = [
  {
    id: 1,
    title: "Turks and Caicos: Beaches Resort",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80",
    price: "From $3,299",
    duration: "7 nights",
    inclusions: ["All-Inclusive", "Family Resort", "Water Park"]
  },
  {
    id: 2,
    title: "Costa Rica: Manuel Antonio",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
    price: "From $1,899",
    duration: "5 nights",
    inclusions: ["Eco-Lodge", "Adventure Tours", "Wildlife Viewing"]
  },
  {
    id: 3,
    title: "Japan: Tokyo & Kyoto Experience",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&q=80",
    price: "From $4,599",
    duration: "10 nights",
    inclusions: ["Cultural Tours", "Bullet Train", "Traditional Ryokan"]
  }
];

export const searchResults = {
  packages: [
    {
      id: 1,
      title: "San Francisco: Your Way Hotel and Airfare Package",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80",
      city: "San Francisco",
      includes: ["Package Includes", "Flights", "Rental Car"],
      options: "Multiple hotels available",
      memberReviews: "Costco Member Reviews",
      reviewText: "Not enough reviews to display yet!",
      priceStatus: "Not Available",
      adjustText: "Adjust Your Search"
    },
    {
      id: 2,
      title: "San Francisco: Hyatt Regency San Francisco Package",
      image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=400&h=300&fit=crop&q=80",
      city: "San Francisco",
      hotel: "Hyatt Regency San Francisco",
      includes: ["Package Includes", "Flights, Rental Car"],
      memberReviews: "Costco Member Reviews",
      rating: 4.5,
      reviewCount: "1,261 Reviews",
      features: [
        "Complimentary Room Upgrade",
        "Daily Buffet Breakfast",
        "Reduced Mandatory Daily Resort Fee"
      ],
      priceStatus: "Not Available",
      adjustText: "Adjust Your Search"
    },
    {
      id: 3,
      title: "San Francisco: Fairmont San Francisco Package",
      image: "https://images.unsplash.com/photo-1541395128203-01b2caf49815?w=400&h=300&fit=crop&q=80",
      city: "San Francisco",
      hotel: "Fairmont San Francisco",
      includes: ["Package Includes", "Flights, Rental Car"],
      memberReviews: "Costco Member Reviews",
      rating: 4.7,
      reviewCount: "892 Reviews",
      features: [
        "Historic Luxury Hotel",
        "Complimentary WiFi",
        "Concierge Services"
      ],
      priceStatus: "Not Available",
      adjustText: "Adjust Your Search"
    }
  ]
};

export const filterOptions = {
  sortBy: [
    { value: "price-low", label: "Price - low to high" },
    { value: "price-high", label: "Price - high to low" },
    { value: "member-reviews", label: "Costco Member Reviews" },
    { value: "star-rating", label: "Costco Star Rating" },
    { value: "hotel-name-az", label: "Hotel Name A-Z" },
    { value: "hotel-name-za", label: "Hotel Name Z-A" }
  ],
  memberReviews: [
    { value: "all", label: "All Member Reviews (3)" },
    { value: "5-star", label: "★★★★★ of (3)" },
    { value: "4-star", label: "★★★★ of (7)" },
    { value: "3-star", label: "★★★ of (7)" },
    { value: "not-reviewed", label: "Not yet reviewed (2)" }
  ],
  starRating: [
    { value: "all", label: "All Ratings (7)" },
    { value: "5-star", label: "5 Star (7)" },
    { value: "4-star", label: "4 Star (3)" },
    { value: "3-star", label: "3 Star (1)" },
    { value: "2-star", label: "2 Star (1)" },
    { value: "not-rated", label: "Not Rated (1)" }
  ]
};