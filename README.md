
# 🏗️ Task Architect | Full-Stack DevOps Dashboard

A containerized, real-time system monitoring dashboard built to demonstrate modern full-stack architecture and DevOps orchestration.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=fastapi&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 🚀 The Architecture

This project implements a decoupled **Client-Server** model orchestrated via **Docker Compose**.

- **Frontend**: React 19 + Vite + Tailwind CSS v4. Features a custom "Control Center" UI with live log buffering and system health polling.
- **Backend**: FastAPI (Python 3.11). A high-performance ASGI service providing health metrics and system status via RESTful endpoints.
- **Orchestration**: Docker Compose manages the bridge network, ensuring service discovery and dependency management (`depends_on`).

## 🛠️ DevOps Features

- **Containerization**: Fully Dockerized environment for consistent "it-works-on-my-machine" deployment.
- **Health Probing**: Real-time polling mechanism with error handling and "System Fault" UI states.
- **Networking**: Isolated bridge network for secure microservice communication.

## 🚦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd task-architect
   ```


2. *Access the dashboard at `http://localhost:5173`*
3. **Manual Development Mode:**
   * **Backend** : `uvicorn main:app --reload` (in `/backend`)
   * **Frontend** : `npm run dev` (in `/frontend`)

## 🧠 Engineering Decisions

* **Tailwind v4 CSS-in-JS** : Leveraged the new Vite plugin for optimized build times and zero-runtime CSS.
* **State-Driven UI** : Used React `useEffect` hooks to synchronize UI states with backend health availability.
