import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { whatsHotDeals } from "../data/mockData";

const WhatsHot = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-light text-blue-400 mb-12">What's Hot</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatsHotDeals.map((deal) => (
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
                  {deal.inclusions.map((inclusion, index) => (
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