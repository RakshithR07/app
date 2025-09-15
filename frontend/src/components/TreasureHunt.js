import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { treasureHuntDeals } from "../data/mockData";

const TreasureHunt = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-light text-blue-400 mb-12">Treasure Hunt</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treasureHuntDeals.map((deal) => (
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
                  {deal.benefits.map((benefit, index) => (
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