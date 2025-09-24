# URL Shortener — React + Node.js + MongoDB

A visually rich URL shortener with smooth animations and a professional UI. Built with vanilla React (JavaScript only) on the frontend and Node.js + Express + MongoDB on the backend. Create short links, view recent history, open/copy them, and delete when done. Data persists in MongoDB.

---

## Features

- Sleek, responsive UI (vanilla CSS) with tasteful gradients and motion  
- Shorten any long URL into a clean code  
- Recent links history with:  
  - Open in new tab  
  - Copy short link  
  - Delete from list  
- Local persistence (frontend) and MongoDB persistence (backend)  
- Direct redirect endpoint: visiting `/{code}` redirects to the original URL  

---

## Tech Stack

- Frontend: React 19 (JavaScript), vanilla CSS  
- Backend: Node.js, Express, Mongoose, nanoid, dotenv, nodemon (dev)  
- Database: MongoDB (works with MongoDB Compass)  
- Structure: Monorepo  
  - frontend/: React app (Create React App base, no TypeScript)  
  - backend/: Express API with Mongoose models  

---

## API Endpoints

| Method | Endpoint               | Description ---------------------------------------------|
|--------|------------------------|----------------------------------------------------------|
| POST   | /api/shorten           | Body `{ url }` → returns `{ code, shortened, original }` |
| GET    | /api/urls              | List recent shortened URLs                               |
| DELETE | /api/urls/:code        | Delete a short code                                      |
| GET    | /:code                 | Redirect to original URL                                 |

