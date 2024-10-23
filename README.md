# Shopping List Application

## Overview
This is a full-stack shopping list application built with Laravel (PHP) backend and React frontend. It allows users to create accounts, log in, and manage their personal shopping lists.

## Features
- User Authentication (Register, Login, Logout)
- Create, Read, Update, and Delete shopping list items
- Mark items as purchased
- Responsive design using Material-UI

## Technologies Used
### Backend
- Laravel 8+
- PHP 7.4+
- MySQL
- Laravel Sanctum for API authentication

### Frontend
- React 17+
- Redux for state management
- React Router for navigation
- Material-UI for styling
- Axios for API requests

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend/new-backend
   ```
2. Install PHP dependencies:
   ```
   composer install
   ```
3. Copy the `.env.example` file to `.env` and configure your database settings
4. Generate application key:
   ```
   php artisan key:generate
   ```
5. Run database migrations:
   ```
   php artisan migrate
   ```
6. Start the Laravel development server:
   ```
   php artisan serve
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install Node.js dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```

## API Endpoints
- POST /api/register - Register a new user
- POST /api/login - Log in a user
- GET /api/shopping-list - Get all shopping list items for the authenticated user
- POST /api/shopping-list - Create a new shopping list item
- PUT /api/shopping-list/{id} - Update a shopping list item
- DELETE /api/shopping-list/{id} - Delete a shopping list item

## Future Improvements
- Add unit and integration tests
- Implement forgot password functionality
- Add ability to share shopping lists between users
- Implement categories for shopping list items

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
