# DevPulse Issue Tracker

## Live URL
URL:
  ```txt
https://devpulse-blond-five.vercel.app/
  ```

## Features

- User registration and login
- JWT-based authentication
- Role-based authorization
- Contributor and maintainer user roles
- Issue filtering by type and status
- Issue sorting by newest or oldest
- PostgreSQL database integration

## Tech Stack

| Tech Stack |
|---|
| Node.js |
| Express.js |
| TypeScript |
| PostgreSQL |
| jsonwebtoken |
| bcryptjs |
| dotenv |
| tsup |
| tsx |

## Setup Steps

### 1. Clone the repository

```bash
git clone https://github.com/Adnan-Shahriar-1190/Assignment-2.git
cd Assignment_2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the root directory and add the following values:

```env
PORT=5000
CONNECTIONSTRING= postgresql_connection_string
JWT_SECRET= jwt_secret
```

### 4. Run the project in development mode

```bash
npm run dev
```

### 5. Build the project

```bash
npm run build
```

### 6. Start the production server

```bash
npm start
```

The server will run on the port defined in the `.env` file.

## API Endpoints

### Root Route

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | root route |

### Auth Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login user and receive JWT token |

### Issue Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/issues` | Authenticated | Create a new issue |
| GET | `/api/issues` | Public | Get all issues |
| GET | `/api/issues/:id` | Public | Get a single issue by ID |
| PATCH | `/api/issues/:id` | Authenticated | Update an issue based on role permissions |
| DELETE | `/api/issues/:id` | Maintainer only | Delete an issue |

## Query Parameters for Issues

The `GET /api/issues` endpoint supports optional query parameters:

| Parameter | Accepted Values | Default |
|---|---|---|
| `sort` | `newest`, `oldest` | `newest` | 
| `type` | `bug`, `feature_request` | none | 
| `status` | `open`, `in_progress`, `resolved` | none |

Example:

```txt
GET /api/issues?sort=newest&type=bug&status=open
```

## Authentication

Protected routes needs a JWT token in the request header:

```txt
Authorization: <JWT_TOKEN>
```

The JWT payload includes the user's ID, name, email, and role. This information is used to identify the requester and enforce permissions.

## Database Schema Summary

### users Table

| Field | Type |
|---|---|
| `id` | `SERIAL PRIMARY KEY` | 
| `name` | `VARCHAR(20) NOT NULL` |
| `email` | `VARCHAR(50) UNIQUE NOT NULL` | 
| `password` | `TEXT NOT NULL` |
| `role` | `VARCHAR(20) DEFAULT 'contributor'` |
| `created_at` | `TIMESTAMP DEFAULT NOW()` | 
| `updated_at` | `TIMESTAMP DEFAULT NOW()` |

### issues Table

| Field | Type |
|---|---|
| `id` | `SERIAL PRIMARY KEY` |
| `title` | `VARCHAR(150) NOT NULL` | 
| `description` | `TEXT NOT NULL` | 
| `type` | `VARCHAR(20) NOT NULL` | 
| `status` | `VARCHAR(20) DEFAULT 'open'` | 
| `reporter_id` | `INT NOT NULL` | 
| `created_at` | `TIMESTAMP DEFAULT NOW()` | 
| `updated_at` | `TIMESTAMP DEFAULT NOW()` |

## User Roles and Permissions

| Role | Permissions |
|---|---|
| contributor | Register, login, create issues, view issues, update own open issues |
| maintainer | All contributor permissions, update any issue, delete any issue |


