Perfect ✅ Here’s a **professional `README.md`** tailored for your assignment:

# 🚀 Predusk Assignment

A full-stack **MERN application** showcasing profile management, project portfolio, skill aggregation, and search functionality.  
Deployed here 👉 [Live Demo](https://predusk-assignment-delta.vercel.app/)  

---

## 📂 Project Structure
```

predusk-assignment/
├── backend/        # Express + MongoDB API
├── frontend/       # React + Vite client

````

---

## ⚙️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS, TypeScript
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** Lodash.debounce, Helmet, CORS, Compression, Morgan

---

## 📘 Features
- Profile CRUD (only one profile allowed)
- Project CRUD with filters & pagination
- Search across projects and profiles
- Top skills aggregation from projects
- Mobile-friendly responsive UI
- Health check endpoint

---

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/tsujit74/predusk-assignment.git
cd predusk-assignment
````

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔗 API Endpoints

### Health

* `GET /api/misc/health`

### Profile

* `GET /api/profile`
* `POST /api/profile`
* `PUT /api/profile`
* `DELETE /api/profile`

### Projects

* `GET /api/projects?skill=python&q=mern&page=1&limit=10`
* `GET /api/projects/:id`
* `POST /api/projects`
* `PUT /api/projects/:id`
* `DELETE /api/projects/:id`

### Skills

* `GET /api/misc/skills/top?limit=10`

### Search

* `GET /api/misc/search?q=mern`

---

## 📘 Database Schema

See [Schema.md](./Schema.md) for detailed schema & API contract.

---

## 🌐 Deployment

* **Frontend (Vercel):** [Live Link](https://predusk-assignment-delta.vercel.app/)
* **Backend (Render):**  [Live Link](https://predusk-assignment-cyvh.onrender.com) 

---

## 👨‍💻 Author

**Sujit Thakur**

* Portfolio: [sujit-porttfolio.vercel.app](https://sujit-porttfolio.vercel.app/)
* GitHub: [tsujit74](https://github.com/tsujit74)
* Email: [tsujeet440@gmail.com](mailto:tsujeet440@gmail.com)

```

---

