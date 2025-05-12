<p align="center">
  <img src="assets/architecture.png" alt="Uber Microservices Architecture" width="80%"/>
</p>

<h1 align="center">🚗 UberMicroservice Platform</h1>
<p align="center"><strong>Scalable Node.js ride-sharing microservices with Docker & Kubernetes orchestration</strong></p>

<p align="center">
  <a href="#services">⚙️ Services</a> •  
  <a href="#techniques">🔬 Techniques</a> •  
  <a href="#technologies">🔧 Technologies</a> •  
  <a href="#structure">📁 Structure</a> •  
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

## ⚙️ Services

- **auth-service**: JWT auth & authorization via [Express JWT](https://expressjs.com/en/resources/middleware.html#expressjwt).  
- **user-service**: Rider & driver profile CRUD with RESTful APIs.  
- **ride-service**: Trip matching, pricing engine, surge calculations.  
- **notification-service**: Real-time alerts with [Socket.IO](https://socket.io/).  

---

## 🔬 Techniques

- **API Gateway Pattern**: Centralized routing with NGINX ([docs](https://nginx.org/en/docs/)).  
- **Circuit Breaker**: Resiliency with [`opossum`](https://nodeshift.dev/opossum/).  
- **Event-Driven Architecture**: Asynchronous messaging via [RabbitMQ](https://www.rabbitmq.com/).  
- **Container Orchestration**: Docker Compose & Kubernetes ([helm.sh](https://helm.sh/)).  
- **Zero-Downtime Deployments**: Rolling updates via Kubernetes Deployments ([docs](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)).  

---

## 🔧 Technologies

- **Node.js** – JavaScript runtime ([nodejs.org](https://nodejs.org/)).  
- **Express.js** – Web framework ([expressjs.com](https://expressjs.com/)).  
- **Docker** & **Docker Compose** – Containerization ([docker.com](https://docs.docker.com/)).  
- **Kubernetes** – Orchestration ([kubernetes.io](https://kubernetes.io/docs/home/)).  
- **RabbitMQ** – Message broker ([rabbitmq.com](https://www.rabbitmq.com/documentation.html)).  
- **Redis** – In-memory cache & pub/sub ([redis.io](https://redis.io/documentation)).  
- **MongoDB** – NoSQL datastore ([mongodb.com](https://docs.mongodb.com/)).  
- **Swagger UI** – API docs ([swagger.io](https://swagger.io/docs/)).  

---

## 📁 Structure

```bash
.
├── backend/                # Node.js microservices
│   ├── auth-service/
│   ├── user-service/
│   ├── ride-service/
│   └── notification-service/
├── frontend/               # React client or dashboard
│   ├── public/
│   └── src/
├── docker/                 # Dockerfiles & compose configs
│   ├── auth-service.Dockerfile
│   └── docker-compose.yml
└── .vscode/                # IDE settings
