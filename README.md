# URLShortner

A full-stack URL shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to create shortened URLs, manage their links, and includes user authentication features.

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **URL Shortening**: Generate short URLs using nanoid for unique identifiers.
- **Link Management**: Users can create, view, and manage their shortened URLs.
- **Redirect Functionality**: Automatic redirection from short URLs to original URLs.
- **Responsive UI**: Modern React frontend with TailwindCSS for styling.
- **State Management**: Redux Toolkit for efficient state handling.
- **API Integration**: Axios for seamless backend communication.
- **Error Handling**: Comprehensive error handling on both frontend and backend.

## Tech Stack

### Backend

- **Node.js** with **Express.js** for server-side logic
- **MongoDB** with **Mongoose** for database management
- **JWT** for authentication
- **bcrypt** for password hashing
- **nanoid** for generating short URL IDs
- **OpenAI** integration (for potential AI features)
- **CORS** for cross-origin requests
- **Cookie Parser** for handling cookies

### Frontend

- **React** with **Vite** for fast development and building
- **Redux Toolkit** for state management
- **TanStack React Query** for data fetching and caching
- **TanStack React Router** for routing
- **TailwindCSS** for styling
- **Axios** for API calls
- **ESLint** for code linting

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:

   ```bash
   cd URLShortner/Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key (if using AI features)
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the Frontend directory:

   ```bash
   cd URLShortner/Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

## Usage

1. Register a new account or log in with existing credentials.
2. Create shortened URLs by providing the original URL.
3. Manage your links from the dashboard.
4. Share the shortened URLs, which will redirect to the original URLs.

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Management

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### URL Shortening

- `POST /api/create` - Create a new shortened URL
- `GET /api/create/:id` - Get details of a shortened URL
- `GET /:id` - Redirect to original URL

## Future Features

- Chrome extension for quick URL shortening
- Admin dashboard for managing all URLs
- QR code generator for shortened URLs
- Link expiration with cron jobs

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any questions or suggestions, please open an issue on GitHub.
here is my email id : <jitendrakumar.dev.cs@gmail.com>