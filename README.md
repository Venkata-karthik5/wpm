# Recipe Social (Angular + Node/Express + MongoDB)

A beginner-friendly social recipe app: users can register/login, post recipes, like and comment, and search by ingredients. No images used.

## Prerequisites
- Node.js 18+
- MongoDB running locally (default connection `mongodb://127.0.0.1:27017`)

## Setup

### Backend
```bash
cd backend
npm run dev
```
Config via `.env`:
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB=recipesocial
JWT_SECRET=devsecret
```
API base: `http://localhost:4000/api`

### Frontend
```bash
cd frontend
npm start
```
Then open `http://localhost:4200`.

## Features
- Auth: Register, Login (JWT stored in localStorage)
- Recipes: List, detail, create, like, comments
- Search: by title or ingredient
- Styling: Tailwind CSS

## Notes
- Ensure backend is running before using the frontend.
- For production, secure env vars and use a proper MongoDB instance.