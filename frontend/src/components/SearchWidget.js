import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, MapPin, Plane, Car, Ship, Luggage } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState("packages");
  const [searchData, setSearchData] = useState({
    destination: "",
    departure: "",
    return: "",
    rooms: "1",
    adults: "2",
    children: "0",
    flyingFrom: "",
    class: "Any",
    checkIn: "",
    checkOut: "",
    addFlight: false,
    addCar: false
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to search results with search parameters
    const searchParams = new URLSearchParams(searchData);
    navigate(`/search?${searchParams.toString()}&type=${activeTab}`);
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: "packages", label: "Packages", icon: Suitcase },
    { id: "hotels", label: "Hotels", icon: MapPin },
    { id: "cruises", label: "Cruises", icon: Ship },
    { id: "rental-cars", label: "Rental Cars", icon: Car }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 font-medium text-lg transition-colors relative ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Package Search Form */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Hotel Added (required)
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    checked={searchData.addFlight} 
                    onCheckedChange={(checked) => handleInputChange('addFlight', checked)}
                    className="mr-2"
                  />
                  Add Flight
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    checked={searchData.addCar} 
                    onCheckedChange={(checked) => handleInputChange('addCar', checked)}
                    className="mr-2"
                  />
                  Add Car
                </div>
                <div className="ml-auto text-red-500">* Indicates required fields</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination*
                  </label>
                  <Input
                    placeholder="Airport, City or Zip Code"
                    value={searchData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure*
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={searchData.departure}
                      onChange={(e) => handleInputChange('departure', e.target.value)}
                      className="w-full pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return*
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={searchData.return}
                      onChange={(e) => handleInputChange('return', e.target.value)}
                      className="w-full pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rooms
                  </label>
                  <Select value={searchData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adults (19+)
                  </label>
                  <Select value={searchData.adults} onValueChange={(value) => handleInputChange('adults', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Children (0-18)
                  </label>
                  <Select value={searchData.children} onValueChange={(value) => handleInputChange('children', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flying From*
                  </label>
                  <Input
                    placeholder="Enter departure airport"
                    value={searchData.flyingFrom}
                    onChange={(e) => handleInputChange('flyingFrom', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <Select value={searchData.class} onValueChange={(value) => handleInputChange('class', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="First">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold w-full"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Search Form */}
          {activeTab === "hotels" && (
            <div className="space-y-6">
              <div className="flex justify-end text-sm text-red-500 mb-4">
                * Indicates required fields
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination*
                  </label>
                  <Input
                    placeholder="Airport, City or Zip Code"
                    value={searchData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full border-2 border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check In*
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={searchData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      className="w-full pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check Out*
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={searchData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      className="w-full pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rooms
                  </label>
                  <Select value={searchData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adults (19+)
                  </label>
                  <Select value={searchData.adults} onValueChange={(value) => handleInputChange('adults', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Children (0-18)
                  </label>
                  <Select value={searchData.children} onValueChange={(value) => handleInputChange('children', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Checkbox 
                      checked={searchData.addFlight} 
                      onCheckedChange={(checked) => handleInputChange('addFlight', checked)}
                      className="mr-2"
                    />
                    <Plane className="w-4 h-4 mr-1 text-blue-600" />
                    Add Flight
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      checked={searchData.addCar} 
                      onCheckedChange={(checked) => handleInputChange('addCar', checked)}
                      className="mr-2"
                    />
                    <Car className="w-4 h-4 mr-1 text-blue-600" />
                    Add Car
                  </div>
                </div>

                <Button 
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === "cruises" || activeTab === "rental-cars") && (
            <div className="text-center py-12 text-gray-500">
              <Ship className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Search form for {tabs.find(t => t.id === activeTab)?.label} coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;