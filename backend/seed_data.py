import mysql.connector
from mysql.connector import Error
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Database configuration
db_config = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', ''),
    'database': os.getenv('MYSQL_DATABASE', 'costco_travel'),
    'autocommit': True
}

def seed_database():
    """Seed the database with sample data"""
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        # Clear existing data
        cursor.execute("DELETE FROM packages")
        cursor.execute("DELETE FROM hotels")
        cursor.execute("ALTER TABLE hotels AUTO_INCREMENT = 1")
        cursor.execute("ALTER TABLE packages AUTO_INCREMENT = 1")
        
        # Insert sample hotels
        hotels = [
            (1, "Hyatt Regency San Francisco", "San Francisco", "USA", 4.5, "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=400&h=300&fit=crop&q=80", "Luxury hotel in downtown San Francisco", '["WiFi", "Gym", "Pool", "Restaurant"]', 299.99),
            (2, "Fairmont San Francisco", "San Francisco", "USA", 4.7, "https://images.unsplash.com/photo-1541395128203-01b2caf49815?w=400&h=300&fit=crop&q=80", "Historic luxury hotel on Nob Hill", '["WiFi", "Spa", "Concierge", "Room Service"]', 399.99),
            (3, "Grand Wailea Resort", "Maui", "Hawaii", 4.8, "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&q=80", "Luxury resort with world-class spa", '["Beach Access", "Spa", "Pool", "Golf"]', 599.99),
            (4, "OUTRIGGER Kona Resort", "Big Island", "Hawaii", 4.4, "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=400&h=300&fit=crop&q=80", "Beachfront resort with authentic Hawaiian experience", '["Beach Access", "Pool", "Restaurant", "Cultural Activities"]', 349.99),
            (5, "Beaches Resort", "Turks and Caicos", "Caribbean", 4.6, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80", "All-inclusive family resort", '["All-Inclusive", "Water Park", "Kids Club", "Beach Access"]', 899.99),
            (6, "Four Seasons Tokyo", "Tokyo", "Japan", 4.9, "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&q=80", "Luxury hotel in heart of Tokyo", '["City Views", "Spa", "Fine Dining", "Concierge"]', 599.99)
        ]
        
        cursor.executemany("""
            INSERT INTO hotels (id, name, city, country, rating, image_url, description, amenities, price_per_night)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, hotels)
        
        # Insert sample packages
        packages = [
            # Treasure Hunt Deals
            (1, "Norwegian Cruise Line Exclusive Deals", "Caribbean", 7, 1299.99, True, False, False, "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=80", "Daily Gratuities or Shipboard Credit on Select Sailings.Digital Costco Shop Card with Every Sailing", None, '["2024-01-15", "2024-02-20", "2024-03-15"]', True, False, "$400"),
            (2, "Hawaii Island: OUTRIGGER Kona Resort and Spa Club Package", "Hawaii", 5, 2299.99, True, True, False, "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=400&h=300&fit=crop&q=80", "Two Complimentary Luau Tickets.Complimentary Valet Parking.20% Discount on Wind Fair Cruises", 4, '["2024-01-10", "2024-02-14", "2024-03-20"]', True, False, "$400"),
            (3, "Riviera Nayarit: Marival Distinct Package", "Mexico", 6, 1899.99, True, True, False, "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&q=80", "All-Inclusive Resort.Digital Costco Shop Card.One-, Two- and Three-Bedroom Residences", 3, '["2024-01-20", "2024-02-25", "2024-03-30"]', True, False, "$200"),
            
            # What's Hot Deals
            (4, "Turks and Caicos: Beaches Resort", "Turks and Caicos", 7, 3299.99, True, True, False, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80", "All-Inclusive,Family Resort,Water Park", 5, '["2024-02-01", "2024-03-01", "2024-04-01"]', False, True, None),
            (5, "Costa Rica: Manuel Antonio", "Costa Rica", 5, 1899.99, True, True, True, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80", "Eco-Lodge,Adventure Tours,Wildlife Viewing", None, '["2024-01-25", "2024-02-28", "2024-03-25"]', False, True, None),
            (6, "Japan: Tokyo & Kyoto Experience", "Japan", 10, 4599.99, True, True, False, "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&q=80", "Cultural Tours,Bullet Train,Traditional Ryokan", 6, '["2024-03-15", "2024-04-20", "2024-05-15"]', False, True, None),
            
            # Regular search results
            (7, "San Francisco: Your Way Hotel and Airfare Package", "San Francisco", 3, 899.99, True, True, True, "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80", "Multiple hotels available.Costco Member Reviews.Not enough reviews to display yet!", None, '["2024-01-01", "2024-02-01", "2024-03-01"]', False, False, None),
            (8, "San Francisco: Hyatt Regency San Francisco Package", "San Francisco", 4, 1299.99, True, True, True, "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=400&h=300&fit=crop&q=80", "Complimentary Room Upgrade.Daily Buffet Breakfast.Reduced Mandatory Daily Resort Fee", 1, '["2024-01-05", "2024-02-05", "2024-03-05"]', False, False, None),
            (9, "San Francisco: Fairmont San Francisco Package", "San Francisco", 4, 1599.99, True, True, True, "https://images.unsplash.com/photo-1541395128203-01b2caf49815?w=400&h=300&fit=crop&q=80", "Historic Luxury Hotel.Complimentary WiFi.Concierge Services", 2, '["2024-01-10", "2024-02-10", "2024-03-10"]', False, False, None)
        ]
        
        cursor.executemany("""
            INSERT INTO packages (id, title, destination, duration_days, price_per_person, includes_flight, includes_hotel, includes_car, image_url, description, hotel_id, available_dates, is_treasure_hunt, is_whats_hot, extras_value)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, packages)
        
        connection.commit()
        cursor.close()
        connection.close()
        
        print("✅ Database seeded successfully with sample data")
        
    except Error as e:
        print(f"❌ Error seeding database: {e}")

if __name__ == '__main__':
    seed_database()