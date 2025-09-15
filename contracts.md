# Costco Travel API Contracts & Integration Plan

## Backend Technology Stack
- **Framework**: Flask (Python)
- **Database**: MySQL
- **AI Service**: Google Gemini via Emergent LLM Key
- **Authentication**: JWT (for future implementation)

## Database Schema

### users
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- email (VARCHAR(255) UNIQUE)
- password_hash (VARCHAR(255))
- created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

### chat_sessions
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- user_id (INT, NULL for anonymous users)
- created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
- updated_at (DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
- active_search_params (JSON)
- FOREIGN KEY (user_id) REFERENCES users(id)
```

### chat_messages
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- session_id (INT)
- sender (ENUM('user', 'ai'))
- message_text (TEXT)
- timestamp (DATETIME DEFAULT CURRENT_TIMESTAMP)
- FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
```

### hotels
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- name (VARCHAR(255))
- city (VARCHAR(100))
- country (VARCHAR(100))
- rating (DECIMAL(2,1))
- image_url (TEXT)
- description (TEXT)
- amenities (JSON)
- price_per_night (DECIMAL(10,2))
```

### packages
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- title (VARCHAR(255))
- destination (VARCHAR(100))
- duration_days (INT)
- price_per_person (DECIMAL(10,2))
- includes_flight (BOOLEAN DEFAULT TRUE)
- includes_hotel (BOOLEAN DEFAULT TRUE)
- includes_car (BOOLEAN DEFAULT FALSE)
- image_url (TEXT)
- description (TEXT)
- hotel_id (INT)
- available_dates (JSON)
- FOREIGN KEY (hotel_id) REFERENCES hotels(id)
```

## API Endpoints

### 1. Search Endpoints
**POST /api/search**
- Purpose: Handle manual form-based searches
- Request Body:
```json
{
  "type": "packages|hotels|cruises|rental-cars",
  "destination": "string",
  "departure": "YYYY-MM-DD",
  "return": "YYYY-MM-DD",
  "rooms": "int",
  "adults": "int",
  "children": "int",
  "flyingFrom": "string",
  "class": "string"
}
```
- Response:
```json
{
  "results": [...],
  "total": "int",
  "filters": {...}
}
```

### 2. Chat AI Endpoints
**GET /api/chat/history/:user_id**
- Purpose: Retrieve chat history
- Response:
```json
{
  "session_id": "int",
  "messages": [
    {
      "id": "int",
      "sender": "user|ai",
      "message": "string",
      "timestamp": "datetime"
    }
  ]
}
```

**POST /api/chat**
- Purpose: Main conversational AI endpoint
- Request Body:
```json
{
  "user_id": "int|null",
  "session_id": "int|null", 
  "message": "string"
}
```
- Response:
```json
{
  "response": "string",
  "search_results": [...] | null,
  "session_id": "int"
}
```

## Mock Data to Replace

### From mockData.js:
1. **treasureHuntDeals** → Database packages with special deals
2. **whatsHotDeals** → Database packages marked as trending
3. **searchResults.packages** → Real search results from database
4. **filterOptions** → Dynamic filters based on database content

## Gemini AI Integration Workflow

### Chat Logic Flow:
1. **Receive user message** via POST /api/chat
2. **Load context**: Get full conversation history from MySQL
3. **Process with Gemini**: Send conversation + current search params to Gemini
4. **Gemini Prompt Template**:
```
You are a Costco Travel assistant. Your goal is to gather travel search parameters.
Required parameters: 'destination', 'origin', 'departure_month', 'departure_year', 'duration_days', 'travelers', 'budget', 'preferences'

Conversation history: {conversation_history}
Current search params: {current_search_params}
Latest user message: "{new_message}"

Actions:
1. If ALL parameters gathered → Return JSON with search params
2. If missing parameters → Ask follow-up question
3. If unclear intent → Provide helpful response
```

5. **Process Gemini response**:
   - If JSON returned → Execute search & return results
   - If question → Save to chat_messages & return to frontend
   - If conversational → Save & return to frontend

## Frontend Integration Changes

### Files to modify:
1. **SearchWidget.js**: Replace mock search with real API calls
2. **ChatConcierge.js**: Connect to real chat API endpoints
3. **TreasureHunt.js**: Load data from API instead of mockData
4. **WhatsHot.js**: Load data from API instead of mockData
5. **SearchResults.js**: Use real search API and dynamic filters

### API Integration Pattern:
```javascript
// Replace mock calls with:
const API_BASE = process.env.REACT_APP_BACKEND_URL;

const searchPackages = async (searchParams) => {
  const response = await fetch(`${API_BASE}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchParams)
  });
  return response.json();
};
```

## Implementation Priority:
1. ✅ Setup Flask app structure
2. ✅ Create MySQL database & tables
3. ✅ Populate sample data
4. ✅ Implement search endpoints
5. ✅ Integrate Gemini AI for chat
6. ✅ Replace frontend mock data
7. ✅ Test end-to-end functionality

## Environment Variables Required:
- MYSQL_HOST
- MYSQL_USER  
- MYSQL_PASSWORD
- MYSQL_DATABASE
- EMERGENT_LLM_KEY (from environment)
- JWT_SECRET_KEY (for future auth)