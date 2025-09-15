from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import mysql.connector
from mysql.connector import Error
import json
from datetime import datetime, timedelta
import emergentintegrations
from emergentintegrations import EmergentLLM

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', ''),
    'database': os.getenv('MYSQL_DATABASE', 'costco_travel'),
    'autocommit': True
}

# Initialize Emergent LLM client
try:
    llm_client = EmergentLLM()
    print("✅ Emergent LLM client initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize Emergent LLM client: {e}")
    llm_client = None

def get_db_connection():
    """Get database connection"""
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def init_database():
    """Initialize database and create tables"""
    try:
        # Connect without database first to create it
        temp_config = db_config.copy()
        temp_config.pop('database')
        connection = mysql.connector.connect(**temp_config)
        cursor = connection.cursor()
        
        # Create database
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_config['database']}")
        cursor.execute(f"USE {db_config['database']}")
        
        # Create tables
        create_tables = [
            """
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(255) UNIQUE,
                password_hash VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS chat_sessions (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                active_search_params JSON,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                session_id INT,
                sender ENUM('user', 'ai'),
                message_text TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS hotels (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255),
                city VARCHAR(100),
                country VARCHAR(100),
                rating DECIMAL(2,1),
                image_url TEXT,
                description TEXT,
                amenities JSON,
                price_per_night DECIMAL(10,2)
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS packages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255),
                destination VARCHAR(100),
                duration_days INT,
                price_per_person DECIMAL(10,2),
                includes_flight BOOLEAN DEFAULT TRUE,
                includes_hotel BOOLEAN DEFAULT TRUE,
                includes_car BOOLEAN DEFAULT FALSE,
                image_url TEXT,
                description TEXT,
                hotel_id INT,
                available_dates JSON,
                is_treasure_hunt BOOLEAN DEFAULT FALSE,
                is_whats_hot BOOLEAN DEFAULT FALSE,
                extras_value VARCHAR(50),
                FOREIGN KEY (hotel_id) REFERENCES hotels(id)
            )
            """
        ]
        
        for table_sql in create_tables:
            cursor.execute(table_sql)
        
        connection.commit()
        cursor.close()
        connection.close()
        print("✅ Database initialized successfully")
        
    except Error as e:
        print(f"❌ Error initializing database: {e}")

@app.route('/api/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"message": "Costco Travel API is running", "status": "healthy"})

@app.route('/api/search', methods=['POST'])
def search_packages():
    """Search for travel packages"""
    try:
        data = request.get_json()
        search_type = data.get('type', 'packages')
        destination = data.get('destination', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Build search query based on type
        if search_type == 'packages':
            query = """
            SELECT p.*, h.name as hotel_name, h.rating as hotel_rating, h.city, h.country
            FROM packages p
            LEFT JOIN hotels h ON p.hotel_id = h.id
            WHERE (p.destination LIKE %s OR h.city LIKE %s)
            ORDER BY p.price_per_person ASC
            LIMIT 20
            """
            cursor.execute(query, (f'%{destination}%', f'%{destination}%'))
        else:
            # For now, return packages for other types as well
            query = """
            SELECT p.*, h.name as hotel_name, h.rating as hotel_rating, h.city, h.country
            FROM packages p
            LEFT JOIN hotels h ON p.hotel_id = h.id
            ORDER BY p.price_per_person ASC
            LIMIT 20
            """
            cursor.execute(query)
        
        results = cursor.fetchall()
        
        # Format results for frontend
        formatted_results = []
        for result in results:
            formatted_result = {
                "id": result['id'],
                "title": result['title'],
                "image": result['image_url'],
                "city": result['destination'],
                "hotel": result['hotel_name'],
                "includes": ["Package Includes", "Flights" if result['includes_flight'] else "", "Rental Car" if result['includes_car'] else ""],
                "memberReviews": "Costco Member Reviews",
                "rating": float(result['hotel_rating']) if result['hotel_rating'] else None,
                "reviewCount": "Sample Reviews",
                "features": [
                    "Complimentary Room Upgrade",
                    "Daily Buffet Breakfast",
                    "Reduced Mandatory Daily Resort Fee"
                ],
                "priceStatus": f"From ${result['price_per_person']}" if result['price_per_person'] else "Not Available",
                "adjustText": "Adjust Your Search"
            }
            formatted_results.append(formatted_result)
        
        cursor.close()
        connection.close()
        
        return jsonify({
            "results": formatted_results,
            "total": len(formatted_results),
            "destination": destination
        })
        
    except Exception as e:
        print(f"❌ Search error: {e}")
        return jsonify({"error": "Search failed"}), 500

@app.route('/api/treasure-hunt', methods=['GET'])
def get_treasure_hunt():
    """Get treasure hunt deals"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT * FROM packages 
        WHERE is_treasure_hunt = TRUE 
        ORDER BY id 
        LIMIT 6
        """
        cursor.execute(query)
        results = cursor.fetchall()
        
        formatted_results = []
        for result in results:
            formatted_result = {
                "id": result['id'],
                "title": result['title'],
                "image": result['image_url'],
                "benefits": result['description'].split('.') if result['description'] else [],
                "extrasValue": result['extras_value']
            }
            formatted_results.append(formatted_result)
        
        cursor.close()
        connection.close()
        
        return jsonify(formatted_results)
        
    except Exception as e:
        print(f"❌ Treasure hunt error: {e}")
        return jsonify({"error": "Failed to load treasure hunt deals"}), 500

@app.route('/api/whats-hot', methods=['GET'])
def get_whats_hot():
    """Get what's hot deals"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT * FROM packages 
        WHERE is_whats_hot = TRUE 
        ORDER BY id 
        LIMIT 6
        """
        cursor.execute(query)
        results = cursor.fetchall()
        
        formatted_results = []
        for result in results:
            formatted_result = {
                "id": result['id'],
                "title": result['title'],
                "image": result['image_url'],
                "price": f"From ${result['price_per_person']}" if result['price_per_person'] else None,
                "duration": f"{result['duration_days']} nights" if result['duration_days'] else None,
                "inclusions": result['description'].split(',') if result['description'] else []
            }
            formatted_results.append(formatted_result)
        
        cursor.close()
        connection.close()
        
        return jsonify(formatted_results)
        
    except Exception as e:
        print(f"❌ What's hot error: {e}")
        return jsonify({"error": "Failed to load what's hot deals"}), 500

@app.route('/api/chat/history/<int:user_id>', methods=['GET'])
def get_chat_history(user_id):
    """Get chat history for a user"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get or create active session
        cursor.execute("""
            SELECT * FROM chat_sessions 
            WHERE user_id = %s 
            ORDER BY updated_at DESC 
            LIMIT 1
        """, (user_id,))
        
        session = cursor.fetchone()
        if not session:
            # Create new session
            cursor.execute("""
                INSERT INTO chat_sessions (user_id, active_search_params)
                VALUES (%s, %s)
            """, (user_id, '{}'))
            session_id = cursor.lastrowid
        else:
            session_id = session['id']
        
        # Get messages for this session
        cursor.execute("""
            SELECT * FROM chat_messages 
            WHERE session_id = %s 
            ORDER BY timestamp ASC
        """, (session_id,))
        
        messages = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({
            "session_id": session_id,
            "messages": messages
        })
        
    except Exception as e:
        print(f"❌ Chat history error: {e}")
        return jsonify({"error": "Failed to load chat history"}), 500

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    """Main chat endpoint with AI processing"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        session_id = data.get('session_id')
        new_message = data.get('message')
        
        if not new_message:
            return jsonify({"error": "Message is required"}), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get or create session
        if not session_id:
            cursor.execute("""
                INSERT INTO chat_sessions (user_id, active_search_params)
                VALUES (%s, %s)
            """, (user_id, '{}'))
            session_id = cursor.lastrowid
        
        # Save user message
        cursor.execute("""
            INSERT INTO chat_messages (session_id, sender, message_text)
            VALUES (%s, 'user', %s)
        """, (session_id, new_message))
        
        # Get conversation history
        cursor.execute("""
            SELECT * FROM chat_messages 
            WHERE session_id = %s 
            ORDER BY timestamp ASC
        """, (session_id,))
        
        messages = cursor.fetchall()
        
        # Get current search params
        cursor.execute("""
            SELECT active_search_params FROM chat_sessions 
            WHERE id = %s
        """, (session_id,))
        
        session_data = cursor.fetchone()
        current_search_params = json.loads(session_data['active_search_params'] or '{}')
        
        # Build conversation history for Gemini
        conversation_history = ""
        for msg in messages[:-1]:  # Exclude the current message
            conversation_history += f"{msg['sender'].capitalize()}: {msg['message_text']}\n"
        
        # Prepare Gemini prompt
        gemini_prompt = f"""You are a helpful and concise Costco Travel assistant. Your goal is to gather all necessary parameters to perform a travel search. The required parameters are: 'destination', 'origin', 'departure_month', 'departure_year', 'duration_days', 'travelers', 'budget', and 'preferences'.

Below is the current conversation history:
---
{conversation_history}
---

Based on the latest message, you must perform one of three actions:
1. **If you have gathered ALL required parameters:** Respond ONLY with a single, minified JSON object containing all the parameters. Do not add any conversational text.
2. **If the user is providing or modifying information but some parameters are still missing:** Acknowledge the information received and then ask a clear, concise follow-up question for the NEXT required piece of information.
3. **If the user's intent is unclear or is just conversational:** Provide a friendly, helpful response.

Current known parameters are: {json.dumps(current_search_params)}
Latest user message is: "{new_message}"
"""
        
        # Call Gemini API
        ai_response = ""
        search_results = None
        
        if llm_client:
            try:
                ai_response = llm_client.complete(
                    prompt=gemini_prompt,
                    model="gemini-1.5-pro-latest",
                    max_tokens=500
                ).strip()
                
                # Check if response is JSON (complete search params)
                try:
                    search_params = json.loads(ai_response)
                    if isinstance(search_params, dict) and 'destination' in search_params:
                        # Update session with search params
                        cursor.execute("""
                            UPDATE chat_sessions 
                            SET active_search_params = %s 
                            WHERE id = %s
                        """, (json.dumps(search_params), session_id))
                        
                        # Execute search
                        search_results = execute_travel_search(search_params, cursor)
                        ai_response = "Great! I found some travel packages for you based on your preferences. Here are the results:"
                        
                except json.JSONDecodeError:
                    # Not JSON, it's a conversational response
                    pass
                    
            except Exception as e:
                print(f"❌ Gemini API error: {e}")
                ai_response = "I'm here to help you plan your perfect trip! Could you tell me where you'd like to go?"
        else:
            # Fallback response when Gemini is not available
            ai_response = generate_fallback_response(new_message, current_search_params)
        
        # Save AI response
        cursor.execute("""
            INSERT INTO chat_messages (session_id, sender, message_text)
            VALUES (%s, 'ai', %s)
        """, (session_id, ai_response))
        
        cursor.close()
        connection.close()
        
        return jsonify({
            "response": ai_response,
            "search_results": search_results,
            "session_id": session_id
        })
        
    except Exception as e:
        print(f"❌ Chat error: {e}")
        return jsonify({"error": "Chat processing failed"}), 500

def execute_travel_search(search_params, cursor):
    """Execute travel search based on AI-gathered parameters"""
    try:
        destination = search_params.get('destination', '')
        travelers = search_params.get('travelers', 2)
        budget = search_params.get('budget', 'any')
        
        query = """
        SELECT p.*, h.name as hotel_name, h.rating as hotel_rating
        FROM packages p
        LEFT JOIN hotels h ON p.hotel_id = h.id
        WHERE p.destination LIKE %s
        ORDER BY p.price_per_person ASC
        LIMIT 5
        """
        
        cursor.execute(query, (f'%{destination}%',))
        results = cursor.fetchall()
        
        formatted_results = []
        for result in results:
            formatted_results.append({
                "id": result['id'],
                "title": result['title'],
                "destination": result['destination'],
                "price": f"${result['price_per_person']}" if result['price_per_person'] else "Contact for pricing",
                "duration": f"{result['duration_days']} days" if result['duration_days'] else "",
                "hotel": result['hotel_name'],
                "rating": float(result['hotel_rating']) if result['hotel_rating'] else None
            })
        
        return formatted_results
        
    except Exception as e:
        print(f"❌ Search execution error: {e}")
        return None

def generate_fallback_response(message, current_params):
    """Generate fallback response when Gemini is not available"""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['hawaii', 'maui', 'oahu', 'honolulu']):
        return "Hawaii sounds amazing! What time of year are you thinking of traveling, and how many people will be going?"
    elif any(word in message_lower for word in ['europe', 'paris', 'london', 'italy']):
        return "Europe has so many wonderful destinations! Are you interested in a specific country, and what's your preferred travel timeframe?"
    elif any(word in message_lower for word in ['cruise', 'ship', 'sailing']):
        return "Cruises are fantastic! We have exclusive deals with Norwegian Cruise Line. What regions interest you - Caribbean, Mediterranean, Alaska?"
    elif any(word in message_lower for word in ['budget', 'cost', 'price']):
        return "I'd be happy to help you find options within your budget. What's your approximate budget range per person for the trip?"
    else:
        return "I'm here to help you plan your perfect trip! Where would you like to go, and when are you thinking of traveling?"

if __name__ == '__main__':
    init_database()
    app.run(host='0.0.0.0', port=5000, debug=True)