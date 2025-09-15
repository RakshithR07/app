import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { MapPin, Plane, Car, Star, Info } from "lucide-react";
import { searchResults, filterOptions } from "../data/mockData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "price-low",
    memberReviews: "all",
    starRating: "all",
    hotelName: ""
  });

  const searchType = searchParams.get('type') || 'packages';
  const destination = searchParams.get('destination') || 'San Francisco';

  useEffect(() => {
    // Simulate API call with mock data
    setResults(searchResults.packages);
  }, [searchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{destination}</h1>
              <p className="text-blue-200">
                Sep 16, 2025 - Sep 19, 2025 | 1 Room, 2 Travelers | Flights from Norman San Jose International Airport (CA SJC) | 
                <Button variant="link" className="text-blue-200 underline p-0 ml-1">Edit</Button>
              </p>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
              Other Cities
            </Button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl text-blue-200">{results.length} Packages</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Sort by:</h3>
                <div className="space-y-4">
                  {filterOptions.sortBy.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={option.value}
                        name="sortBy"
                        value={option.value}
                        checked={filters.sortBy === option.value}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="text-blue-600"
                      />
                      <label htmlFor={option.value} className="text-sm text-gray-700 cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>

                <hr className="my-6" />

                <h4 className="font-semibold mb-4">Search by Hotel Name:</h4>
                <Input
                  placeholder="Enter hotel name"
                  value={filters.hotelName}
                  onChange={(e) => handleFilterChange('hotelName', e.target.value)}
                  className="mb-6"
                />

                <h4 className="font-semibold mb-4">Filter by:</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium mb-3 flex items-center">
                      Costco Member Reviews
                      <Info className="w-4 h-4 ml-1 text-blue-600" />
                    </h5>
                    <div className="space-y-2">
                      {filterOptions.memberReviews.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`member-${option.value}`}
                            name="memberReviews"
                            value={option.value}
                            checked={filters.memberReviews === option.value}
                            onChange={(e) => handleFilterChange('memberReviews', e.target.value)}
                            className="text-blue-600"
                          />
                          <label htmlFor={`member-${option.value}`} className="text-sm text-gray-700 cursor-pointer">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-3 flex items-center">
                      Costco Star Rating
                      <Info className="w-4 h-4 ml-1 text-blue-600" />
                    </h5>
                    <div className="space-y-2">
                      {filterOptions.starRating.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`star-${option.value}`}
                            checked={filters.starRating === option.value}
                            onCheckedChange={(checked) => checked && handleFilterChange('starRating', option.value)}
                          />
                          <label htmlFor={`star-${option.value}`} className="text-sm text-gray-700 cursor-pointer">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {results.map((result) => (
                <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-600">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          Map
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {result.title}
                          </h3>
                          
                          {result.includes && (
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center text-blue-600 text-sm">
                                <Plane className="w-4 h-4 mr-1" />
                                {result.includes[0]}
                              </div>
                              <div className="flex items-center text-blue-600 text-sm">
                                <Car className="w-4 h-4 mr-1" />
                                {result.includes[1]}
                              </div>
                            </div>
                          )}

                          {result.options && (
                            <div className="mb-3">
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {result.options}
                              </Badge>
                            </div>
                          )}

                          <div className="mb-4">
                            <p className="text-sm text-gray-600 font-medium">{result.memberReviews}</p>
                            {result.rating ? (
                              <div className="flex items-center mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(result.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-blue-600">
                                  {result.rating} ({result.reviewCount})
                                </span>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mt-1">{result.reviewText}</p>
                            )}
                          </div>

                          {result.features && (
                            <div className="space-y-1 mb-4">
                              {result.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Price Section */}
                        <div className="text-right ml-4">
                          <div className="text-red-500 font-medium mb-2">
                            {result.priceStatus}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            {result.adjustText}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;