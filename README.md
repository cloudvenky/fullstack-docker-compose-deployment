# Containerized Full-Stack Application Deployment Using Docker and Docker Compose

A hands-on DevOps project to build, containerize, and deploy a full-stack application on **AWS EC2 (Amazon Linux 2023)** using Docker and Docker Compose.

> **Project status:** In progress. The repository is initialized; application code and deployment configuration will be added as each implementation step is completed and verified.

## Planned architecture

```text
Browser
   |
   v
React Frontend (Nginx)
   |
   v
Node.js + Express REST API
   |
   v
MongoDB
```

Docker Compose will manage the frontend, backend, and database containers on a dedicated Docker network. MongoDB data will be stored in a persistent Docker volume.

## Technology stack

- React — frontend
- Node.js and Express — backend API
- MongoDB — database
- Nginx — frontend web server
- Docker — containerization
- Docker Compose — multi-container orchestration
- AWS EC2, Amazon Linux 2023 — deployment environment

## Planned repository structure

```text
fullstack-docker-compose-deployment/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── .dockerignore
└── README.md
```

## Implementation plan

- [ ] Prepare AWS EC2 with Amazon Linux 2023
- [ ] Install and verify Docker Engine
- [ ] Install and verify Docker Compose
- [ ] Build the React frontend
- [ ] Build the Node.js/Express backend
- [ ] Configure MongoDB and persistent storage
- [ ] Create Dockerfiles and Docker Compose configuration
- [ ] Build and run the complete application
- [ ] Test frontend, API, database connectivity, and persistence
- [ ] Deploy and verify the application on EC2
- [ ] Add deployment screenshots and final documentation

## Getting started

Implementation instructions and verified commands will be added to this README as the project progresses.

## Security

- Do not commit real passwords, API keys, AWS credentials, private keys, or production environment files.
- Keep local environment files such as `.env` out of Git.
- Use security-group rules that expose only the ports required for the deployment.
