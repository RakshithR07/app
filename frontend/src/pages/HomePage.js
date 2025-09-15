import React from "react";
import SearchWidget from "../components/SearchWidget";
import TreasureHunt from "../components/TreasureHunt";
import WhatsHot from "../components/WhatsHot";
import ChatConcierge from "../components/ChatConcierge";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchWidget />
      <TreasureHunt />
      <WhatsHot />
      <ChatConcierge />
    </div>
  );
};

export default HomePage;