<p align="center">
  <img src="assets/architecture.png" alt="Uber Microservices Architecture" width="80%"/>
</p>

<h1 align="center">🚗 UberMicroservice Platform</h1>
<p align="center"><strong>Scalable Node.js ride-sharing microservices | Docker & Kubernetes orchestration</strong></p>

<p align="center">
  <a href="#overview">🔎 Overview</a> •  
  <a href="#services">⚙️ Services</a> •  
  <a href="#techniques">🔬 Techniques</a> •  
  <a href="#tech-stack">🛠️ Tech Stack</a> •  
  <a href="#structure">📂 Structure</a> •  
  <a href="#contributors">👥 Contributors</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-14%2B-green?logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-4.x-orange?logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-20.x-blue?logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Kubernetes-1.22-blue?logo=kubernetes&logoColor=white"/>
  <img src="https://img.shields.io/badge/RabbitMQ-3.9-red?logo=rabbitmq&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redis-6.x-yellow?logo=redis&logoColor=white"/>
</p>

---

## 🔎 Overview

UberMicroservice Platform is a modular ride-sharing backend built in Node.js.  
Each concern lives in its own service, running in Docker containers and managed by Kubernetes for high availability and easy scaling.

---

## ⚙️ Services

- **auth-service**  
  JWT authentication & authorization ([express-jwt](https://expressjs.com/en/resources/middleware.html#expressjwt)).  
- **user-service**  
  Rider & driver profile CRUD via RESTful endpoints.  
- **ride-service**  
  Trip matching, dynamic pricing & surge logic.  
- **notification-service**  
  Real-time push notifications leveraging [Socket.IO](https://socket.io/).  

---

## 🔬 Techniques

- **API Gateway Pattern**  
  Central routing & load balancing with NGINX ([docs](https://nginx.org/en/docs/)).  
- **Circuit Breaker**  
  Service resilience via [opossum](https://nodeshift.dev/opossum/).  
- **Event-Driven Architecture**  
  Async messaging with [RabbitMQ](https://www.rabbitmq.com/).  
- **Container Orchestration**  
  Docker Compose for local stacks & Kubernetes for production ([helm.sh](https://helm.sh/)).  
- **Zero-Downtime Deployments**  
  Rolling updates configured in Kubernetes Deployments ([docs](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)).  

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-14%2B-green?logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-4.x-lightgrey?logo=express&logoColor=black"/>
  <img src="https://img.shields.io/badge/Docker-20.x-blue?logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Kubernetes-1.22-blue?logo=kubernetes&logoColor=white"/>
  <img src="https://img.shields.io/badge/RabbitMQ-3.9-red?logo=rabbitmq&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redis-6.x-yellow?logo=redis&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-4.4-green?logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-UI-blue?logo=swagger&logoColor=white"/>
</p>

---

## 📂 Structure

```bash
.
├── backend/                  # All Node.js services
│   ├── auth-service/
│   ├── user-service/
│   ├── ride-service/
│   └── notification-service/
├── frontend/                 # Optional client app (React/Vue)
│   ├── public/
│   └── src/
├── docker/                   # Dockerfiles & Compose configs
│   ├── auth-service.Dockerfile
│   └── docker-compose.yml
└── .vscode/                  # IDE settings
