# Savoria - Modern Restaurant App

A complete, modern, production-ready food restaurant website built using Node.js, Express.js, HTML5, CSS3, and vanilla JavaScript.

## Tech Stack

*   **Frontend**: Vanilla HTML5, CSS3, JavaScript (Single Page Application architecture)
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose
*   **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Features

*   **Responsive UI**: Premium design that looks great on mobile, tablet, and desktop.
*   **SPA Navigation**: Fast navigation using Vanilla JS router.
*   **Menu & Categories**: View featured dishes and full menu items dynamically fetched from the database.
*   **Shopping Cart**: Add to cart, adjust quantities, remove items, and see live total calculations.
*   **Checkout & Orders**: Secure order placement for authenticated users.
*   **Authentication**: Full user login and registration system.
*   **API**: RESTful backend with proper error handling and auth middleware.

## Project Structure

```
restaurant-app/
├── client/                 # Frontend Static Files
│   ├── index.html          # Main SPA Entry
│   ├── css/style.css       # Design System & Styles
│   └── js/
│       ├── app.js          # SPA Logic & View Rendering
│       └── api.js          # Backend API communication
├── server/                 # Backend Node.js App
│   ├── server.js           # Server Entry
│   ├── seeder.js           # Database Seeder script
│   ├── config/db.js        # MongoDB Connection
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # Express Routers
│   ├── middleware/         # Auth & Error middlewares
│   └── data/               # Sample JSON data
└── README.md
```

## Setup Instructions

### 1. Database Configuration
Ensure you have MongoDB installed and running locally, or create a MongoDB Atlas cluster.
The default connection string looks for a local MongoDB on `mongodb://localhost:27017/restaurant-app`.

### 2. Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   (Make sure `MONGO_URI` is correct for your setup).

### 3. Import Sample Data
To populate your database with categories and menu items, run the seeder:
```bash
npm run seed -- -i
```
*(To destroy data later, you can run `npm run seed -- -d`)*

### 4. Run the Application
Start the backend server:
```bash
npm run dev
```
The API will run on `http://localhost:5000`.

### 5. Run the Frontend
Since the frontend uses ES6 modules and fetches data, you should serve it via a local web server (opening `index.html` directly in the browser may cause CORS or file:// protocol issues).

You can use a simple server like `live-server` or VS Code Live Server extension:
```bash
npx serve client
```
Or open the `client` folder in VS Code and click "Go Live" if you have the Live Server extension.

## API Endpoints

### Auth
*   `POST /api/auth/register` - Register user
*   `POST /api/auth/login` - Login user
*   `GET /api/auth/me` - Get current user

### Menu
*   `GET /api/menu` - Get all menu items
*   `GET /api/menu/:id` - Get single menu item
*   `GET /api/menu/categories` - Get all categories
*   `POST /api/menu` - Create menu item (Admin)

### Orders
*   `POST /api/orders` - Create order
*   `GET /api/orders/myorders` - Get user orders
*   `GET /api/orders/:id` - Get order by ID
