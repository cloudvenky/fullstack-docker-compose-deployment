# Containerized Full-Stack Application Deployment Using Docker and Docker Compose

A full-stack task manager built with React, Node.js/Express, and MongoDB, containerized with Docker and orchestrated using Docker Compose.

## Architecture

```text
Browser
  |
  | http://EC2_PUBLIC_IP:3000
  v
Frontend container (Nginx + React)
  |
  | /api/* reverse proxy
  v
Backend container (Node.js + Express :5000)
  |
  v
MongoDB container (:27017)
  |
  v
Named Docker volume (mongodb_data)
```

All containers communicate over the private `app-network`. Only the frontend port is published to the host by default; Nginx proxies API requests to the backend. MongoDB data persists in a named volume.

## Technology stack

- React 19 + Vite
- Node.js 22 + Express 5
- MongoDB 7 + Mongoose
- Nginx
- Docker Engine and Docker Compose
- Target deployment: AWS EC2 with Amazon Linux 2023

## Repository structure

```text
.
├── backend/
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/App.jsx
│   ├── src/main.jsx
│   ├── src/style.css
│   ├── index.html
│   ├── vite.config.js
│   ├── nginx.conf
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .dockerignore
└── README.md
```

## Run locally or on an EC2 host

1. Install Docker Engine and the Docker Compose plugin.
2. Clone the repository:

   ```bash
   git clone https://github.com/cloudvenky/fullstack-docker-compose-deployment.git
   cd fullstack-docker-compose-deployment
   ```

3. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set a strong local MongoDB password. Do not commit `.env`.
5. Build and start the services:

   ```bash
   docker compose up -d --build
   ```

6. Check the containers and logs:

   ```bash
   docker compose ps
   docker compose logs -f
   ```

7. Open `http://localhost:3000` (or `http://EC2_PUBLIC_IP:3000` on EC2).

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend and database status |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create a task; JSON body: `{"title":"Learn Docker"}` |
| PATCH | `/api/tasks/:id` | Update completion; JSON body: `{"completed":true}` |
| DELETE | `/api/tasks/:id` | Delete a task |

The API is reached through the frontend's Nginx reverse proxy, so browser requests use the same origin.

## Useful Docker commands

```bash
docker compose ps
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f mongodb
docker compose down
```

To remove containers and the persistent database volume (this permanently deletes stored tasks):

```bash
docker compose down -v
```

## Security notes

- Never commit `.env`, AWS credentials, SSH private keys, or real passwords.
- The backend and MongoDB ports are not published to the EC2 host by default.
- For EC2, allow inbound TCP 3000 only from the intended client IP range while testing; restrict SSH (22) to your own IP.
- For production, use HTTPS, a strong secret-management approach, and a reverse proxy or load balancer on standard web ports.

## Project status

- [x] React frontend and task manager UI
- [x] Node.js/Express REST API
- [x] MongoDB model and connection
- [x] Frontend and backend Dockerfiles
- [x] Nginx API reverse proxy
- [x] Docker Compose services, network, health check, and persistent volume
- [ ] Build and test containers on the target EC2 instance
- [ ] Verify database persistence and deployment
- [ ] Add real deployment screenshots
