import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const TreasureHunt = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreasureHunt = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/treasure-hunt`);
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching treasure hunt deals:', error);
        // Fallback to mock data if API fails
        setDeals([
          {
            id: 1,
            title: "Norwegian Cruise Line Exclusive Deals",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=80",
            benefits: [
              "Daily Gratuities or Shipboard Credit on Select Sailings",
              "Digital Costco Shop Card with Every Sailing"
            ],
            extrasValue: "$400"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTreasureHunt();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-blue-400 mb-12">Treasure Hunt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-light text-blue-400 mb-12">Treasure Hunt</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card key={deal.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2">
                  {deal.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  {deal.benefits && deal.benefits.map((benefit, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {benefit}
                    </p>
                  ))}
                </div>
                
                {deal.extrasValue && (
                  <div className="mt-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      Included Extras Valued at {deal.extrasValue}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreasureHunt;