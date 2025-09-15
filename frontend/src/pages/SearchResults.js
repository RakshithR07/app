import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { MapPin, Plane, Car, Star, Info } from "lucide-react";
import { filterOptions } from "../data/mockData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "price-low",
    memberReviews: "all",
    starRating: "all",
    hotelName: ""
  });

  const searchType = searchParams.get('type') || 'packages';
  const destination = searchParams.get('destination') || 'San Francisco';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Check if results are already passed via URL params
        const urlResults = searchParams.get('results');
        if (urlResults) {
          const parsedResults = JSON.parse(urlResults);
          setResults(parsedResults.results || []);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const searchData = {
          type: searchType,
          destination: destination,
          departure: searchParams.get('departure') || '',
          return: searchParams.get('return') || '',
          rooms: searchParams.get('rooms') || '1',
          adults: searchParams.get('adults') || '2',
          children: searchParams.get('children') || '0',
          flyingFrom: searchParams.get('flyingFrom') || '',
          class: searchParams.get('class') || 'Any'
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchData)
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        } else {
          console.error('Failed to fetch search results');
          // Fallback to mock data
          setResults([
            {
              id: 1,
              title: "San Francisco: Your Way Hotel and Airfare Package",
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80",
              priceStatus: "Not Available",
              adjustText: "Adjust Your Search"
            }
          ]);
        }
      } catch (error) {
        console.error('Search results error:', error);
        // Fallback data
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-blue-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{destination}</h1>
                <p className="text-blue-200">Loading search results...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="w-full h-48 bg-gray-200"></div>
                      <div className="md:col-span-2 p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                              {result.includes[1] && (
                                <div className="flex items-center text-blue-600 text-sm">
                                  <Car className="w-4 h-4 mr-1" />
                                  {result.includes[1]}
                                </div>
                              )}
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
                              <p className="text-sm text-gray-500 mt-1">{result.reviewText || "Not enough reviews to display yet!"}</p>
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
                          <div className={`font-medium mb-2 ${result.priceStatus === 'Not Available' ? 'text-red-500' : 'text-green-600'}`}>
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

            {results.length === 0 && !loading && (
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