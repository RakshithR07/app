import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const WhatsHot = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhatsHot = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/whats-hot`);
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching what\'s hot deals:', error);
        // Fallback to mock data if API fails
        setDeals([
          {
            id: 1,
            title: "Turks and Caicos: Beaches Resort",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80",
            price: "From $3,299",
            duration: "7 nights",
            inclusions: ["All-Inclusive", "Family Resort", "Water Park"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWhatsHot();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-blue-400 mb-12">What's Hot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg animate-pulse bg-white">
                <div className="w-full h-64 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
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
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-light text-blue-400 mb-12">What's Hot</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card key={deal.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300" />
                
                {deal.price && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white px-3 py-1">
                      {deal.price}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {deal.title}
                </h3>
                
                {deal.duration && (
                  <p className="text-blue-600 font-medium mb-3">{deal.duration}</p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {deal.inclusions && deal.inclusions.map((inclusion, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      {inclusion}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsHot;