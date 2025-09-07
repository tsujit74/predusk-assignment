
# 📘 Database Schema & API Endpoints

## Models

### Profile
```ts
{
  name: string;               
  email?: string;
  education?: string[];
  skills?: string[];
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  work?: {
    company?: string;
    role?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
````

### Project

```ts
{
  profile: ObjectId (ref Profile); 
  title: string;                   
  description?: string;
  links?: string[];
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## API Endpoints

### Health

* **GET** `/api/misc/health`
  ✅ Returns `{ status: "ok", timestamp }`

---

### Profile

* **GET** `/api/profile` → fetch profile
* **POST** `/api/profile` → create profile (replaces existing)
* **PUT** `/api/profile` → update profile
* **DELETE** `/api/profile` → delete profile

---

### Projects

* **GET** `/api/projects` → list with filters

  * supports `?skill=python`, `?q=mern`, `?page=1&limit=10`
* **GET** `/api/projects/:id` → fetch project by id
* **POST** `/api/projects` → create new project
* **PUT** `/api/projects/:id` → update project
* **DELETE** `/api/projects/:id` → delete project

---

### Skills

* **GET** `/api/misc/skills/top?limit=10`
  ✅ Returns top skills aggregated across projects

---

### Search

* **GET** `/api/misc/search?q=mern`
  ✅ Searches across projects and profiles (full-text search)

```

---

