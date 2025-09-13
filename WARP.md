# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

PostPal is a full-stack social media application (Instagram clone) built with Node.js/Express backend and React frontend. The app features user authentication, post creation with image upload, social interactions (likes, comments, follow/unfollow), and AI-powered caption suggestions using Google's Gemini API.

## Architecture

### Backend Structure (Node.js/Express)
- **Entry Point**: `app.js` - Main Express server with middleware setup and route registration
- **Models**: MongoDB schemas using Mongoose
  - `models/model.js` - User schema with auth fields, profile photos, followers/following
  - `models/post.js` - Post schema with body, photo, likes, comments, timestamps
- **Routes**: RESTful API endpoints
  - `routes/auth.js` - User registration/login with JWT tokens
  - `routes/createPost.js` - CRUD operations for posts, likes, comments
  - `routes/user.js` - User profiles, follow/unfollow, profile picture upload
  - `routes/suggestCaption.js` - AI caption generation using Gemini API
- **Middleware**: `middlewares/requireLogin.js` - JWT authentication middleware
- **Configuration**: `key.js` contains MongoDB connection string and JWT secret

### Frontend Structure (React + Vite)
- **Framework**: React with Vite for development and building
- **Routing**: React Router DOM for SPA navigation
- **Context**: `context/LoginContext.js` manages global authentication state
- **Main App**: `Frontend/src/App.jsx` with route definitions
- **Screens**: Main application views (Home, Profile, CreatePost, SignIn/SignUp)
- **Components**: Reusable UI components including Modal, ProfilePic, SuggestCaptions

### Key Features
- **Authentication**: JWT-based with bcrypt password hashing
- **Image Handling**: Cloudinary for image storage and uploads
- **AI Integration**: Google Gemini API for caption suggestions
- **Real-time UI**: Dynamic post interactions without page refreshes
- **Social Features**: Follow system, likes, comments with user references

## Development Commands

### Backend Development
```bash
# Start backend server (auto-restart with nodemon)
npm start

# Backend runs on port 5000 (or PORT env variable)
```

### Frontend Development
```bash
# Navigate to frontend directory
cd Frontend

# Install frontend dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Full Application Build
```bash
# From root directory - installs frontend deps and builds
npm run build
```

### Environment Setup
1. Create `.env` file with `GEMINI_API_KEY`
2. Configure `key.js` with MongoDB connection string and JWT secret
3. Set up Cloudinary account and update credentials in `CreatePost.jsx`

## Testing and Development

### Running Individual Tests
Currently no test suite is configured. The application uses console logging for debugging.

### Development Workflow
1. Backend changes: Server auto-restarts with nodemon when running `npm start`
2. Frontend changes: Vite provides hot module replacement in dev mode
3. API testing: Use the frontend interface or tools like Postman for `/api` endpoints

## Database and External Services

### MongoDB Schema Design
- Users have embedded followers/following arrays for social graph
- Posts reference users via ObjectId with Mongoose population
- Comments are embedded in posts with user references

### Image Upload Flow
1. Frontend uploads to Cloudinary directly
2. Cloudinary URL stored in MongoDB
3. Images served from Cloudinary CDN

### AI Caption Generation
- Uses Google Gemini 1.5 Flash model
- Two-step process: image description → caption generation
- Temporary file storage in `uploads/` directory

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /signin` - User login, returns JWT token

### Posts
- `GET /allpost` - Fetch all posts (requires auth)
- `POST /createPost` - Create new post (requires auth)
- `GET /mypost` - Get current user's posts
- `PUT /likes` - Like a post
- `PUT /unlikes` - Unlike a post
- `PUT /comment` - Add comment to post
- `DELETE /delete/:postId` - Delete post (owner only)

### Users
- `GET /user/:userid` - Get user profile and posts
- `PUT /follow` - Follow user
- `PUT /unfollow` - Unfollow user
- `GET /myfollowingpost` - Get posts from followed users
- `PUT /uploadProfilePic` - Update profile picture

### AI Features
- `POST /suggest-captions` - Generate captions for uploaded image

## Security Considerations

The codebase contains hardcoded credentials in `key.js` and `.env` files that should be moved to environment variables in production. JWT tokens are stored in localStorage on the frontend for authentication persistence.
