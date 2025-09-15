# Here are your Instructions
Here are the complete step-by-step instructions to run the Costco Travel application on your local machine:

## Prerequisites

1. **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
2. **Python** (v3.8 or later) - [Download here](https://python.org/)
3. **MySQL** - [Download here](https://dev.mysql.com/downloads/mysql/) or use XAMPP/WAMP
4. **Git** - [Download here](https://git-scm.com/)

## Step 1: Download/Clone the Project

If you have the project files, extract them to a folder. Otherwise, create a new folder structure:

```bash
mkdir costco-travel-clone
cd costco-travel-clone
mkdir frontend backend
```

## Step 2: Backend Setup (Flask + MySQL)

### 2.1 Install Python Dependencies

```bash
cd backend
pip install Flask==3.0.0 Flask-CORS==4.0.0 mysql-connector-python==8.2.0 python-dotenv==1.0.0 PyJWT==2.8.0 bcrypt==4.0.1 requests==2.31.0 litellm==1.0.0
```

### 2.2 Setup MySQL Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
CREATE DATABASE costco_travel;
GRANT ALL PRIVILEGES ON costco_travel.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**Option B: Using phpMyAdmin or MySQL Workbench**
- Create a new database named `costco_travel`

### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=costco_travel
JWT_SECRET_KEY=your-secret-key-here
FLASK_ENV=development
EMERGENT_LLM_KEY=your_emergent_key_here
```

**Note**: Replace `your_mysql_password` with your actual MySQL password. For the Emergent LLM key, you can use a placeholder or get one from [Emergent.sh](https://emergent.sh).

### 2.4 Create the Flask Application

Create `app.py` in the backend folder with the Flask code I provided earlier, or copy it from the generated files.

### 2.5 Create the Database Seeder

Create `seed_data.py` in the backend folder with the seeding code, or copy it from the generated files.

### 2.6 Initialize and Seed Database

```bash
cd backend
python -c "from app import init_database; init_database()"
python seed_data.py
```

## Step 3: Frontend Setup (React)

### 3.1 Create React App and Install Dependencies

```bash
cd frontend
npx create-react-app . --template typescript
# OR if you want JavaScript:
npx create-react-app .

# Install required dependencies
npm install @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip axios class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels react-router-dom sonner tailwind-merge tailwindcss-animate vaul zod

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3.2 Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

### 3.3 Setup Environment Variables

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 3.4 Copy Component Files

Copy all the component files I created:
- `src/App.js`
- `src/App.css`
- `src/index.css`
- `src/components/Header.js`
- `src/components/SearchWidget.js`  
- `src/components/TreasureHunt.js`
- `src/components/WhatsHot.js`
- `src/components/ChatConcierge.js`
- `src/pages/HomePage.js`
- `src/pages/SearchResults.js`
- `src/data/mockData.js`

Also copy the entire `src/components/ui/` folder with all the Shadcn components.

## Step 4: Running the Application

### 4.1 Start the Backend (Terminal 1)

```bash
cd backend
python app.py
```

The Flask backend should start on `http://localhost:5000`

### 4.2 Start the Frontend (Terminal 2)

```bash
cd frontend
npm start
```

The React frontend should start on `http://localhost:3000`

## Step 5: Verify Everything Works

1. **Backend API**: Visit `http://localhost:5000/api/` - should return `{"message": "Costco Travel API is running", "status": "healthy"}`

2. **Frontend**: Visit `http://localhost:3000` - should show the Costco Travel homepage

3. **Database**: Check that treasure hunt and what's hot sections load real data

4. **Search**: Try searching for "Hawaii" to see database results

## Troubleshooting

**Common Issues:**

1. **MySQL Connection Error**: Make sure MySQL is running and credentials in `.env` are correct

2. **Port Already in Use**: 
   - Backend: Change port in `app.py`: `app.run(host='0.0.0.0', port=5001)`
   - Update frontend `.env`: `REACT_APP_BACKEND_URL=http://localhost:5001`

3. **CORS Errors**: Make sure Flask-CORS is installed and configured

4. **Missing Dependencies**: Run `pip install` and `npm install` again

5. **Database Tables Not Created**: Run the database initialization command again

**Need Help?** The application should now be running with full functionality including AI chat capabilities! Let me know if you encounter any issues.
