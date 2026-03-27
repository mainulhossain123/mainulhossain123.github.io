---
layout: page
title: Infrastructure Auto-Remediation Platform
description: AI-powered platform for automated infrastructure monitoring, incident detection, and self-healing — featuring Groq AI chat, local ML forecasting, AWS EC2 deployment, and a full observability stack
img: assets/img/projects/infra-autofix-agent.png
importance: 1
category: work
github: https://github.com/mainulhossain123/infra-autofix-agent
tags: [Python, Flask, React, Docker, Terraform, Groq, AWS]
---

## Overview

The Infrastructure Auto-Remediation Platform is a production-ready, open-source system for automated infrastructure monitoring, incident detection, and self-healing. It watches containerized services, detects failures (crashes, CPU spikes, high error rates, latency breaches), and performs intelligent remediation with built-in circuit breaker protection. The platform ships a full ML pipeline (anomaly detection, time-series forecasting, failure prediction) running entirely locally, plus an AI Chat Assistant powered by the Groq API (Llama 3.3 70B) for interactive, incident-aware troubleshooting. Infrastructure can be deployed to AWS EC2 (free tier) with a single Terraform workflow.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/infra-autofix-agent.png" title="Infrastructure Auto-Remediation Platform" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real-time infrastructure monitoring, AI chat, and automated incident response
</div>

## Key Features

### AI Chat Assistant (Groq API)

- **Interactive LLM Assistant**: Chat with Groq's Llama 3.3 70B model about active incidents, metrics, and system health in plain English
- **Context Injection**: Recent incidents and current system health are automatically included in every request for accurate, relevant answers
- **Root Cause Analysis**: Ask for RCA summaries and get actionable remediation recommendations
- **Free Tier**: Groq offers a generous free tier — no credit card required (get a key at [console.groq.com](https://console.groq.com))

### ML & Predictive Analytics (fully local)

- **Anomaly Detection**: Real-time detection using Isolation Forest — 92–95% accuracy, <10ms inference
- **Time-Series Forecasting**: Facebook Prophet predictions 1–24 hours ahead to catch threshold breaches proactively
- **Failure Prediction**: LightGBM forecasts infrastructure failures 1–72 hours out with High/Medium/Low risk levels
- **Continuous Learning**: Models auto-retrain every 24 hours with full version history stored in PostgreSQL

### Automated Remediation

- **Self-Healing Infrastructure**: Automatic container restarts with circuit breaker protection (max 3 restarts per 5 min, 120s cooldown)
- **Manual Override**: One-click manual remediation actions via dashboard or API
- **Incident Logging**: Full audit trail of every incident and remediation action in PostgreSQL

### Real-Time Dashboard & UI

- **React Dashboard**: Live WebSocket updates, incident timeline, CPU/memory/error rate charts
- **AI Chat Page** (`/chat`): Interactive Groq-powered assistant with incident context
- **System Logs Page** (`/system-logs`): Health banner, metric cards (CPU, memory, error rate, uptime), incident severity summary, 15s auto-refresh
- **Notification Bell**: Live badge showing active incident count; dropdown with severity links
- **Incidents Page** (`/incidents`): Filterable list by status and severity

### Observability Stack

- **Prometheus**: Metrics scraping with pre-configured alerts (high error rate, CPU >90%, memory >85%, incident spikes)
- **Grafana**: Pre-built dashboards for system overview, ML performance, and infrastructure metrics
- **Loki + Promtail**: Structured log aggregation queryable via Grafana Explore

### Production Deployments

- **Docker Compose**: Single `docker compose up -d` for local development — 8 services, all with health checks defined
- **AWS EC2**: Terraform-managed `t2.micro` instance in `ap-southeast-1` (Singapore) — free tier eligible, with Elastic IP and GitHub Actions CI/CD for one-click deploy

## Architecture

The platform runs as 8 Docker services:

1. **`ar_app`** — Flask API + ML engine: REST endpoints, WebSocket (Socket.IO), anomaly detection, forecasting, failure prediction, and Groq AI chat
2. **`ar_bot`** — Remediation bot: polls for incidents, applies automated fixes, enforces circuit breaker
3. **`ar_frontend`** — React + Vite dashboard served via nginx; proxies `/api/`, `/health`, and `/socket.io/` to Flask
4. **`ar_postgres`** — PostgreSQL 15: incidents, remediation history, ML model artifacts, metrics history
5. **`ar_prometheus`** — Prometheus metrics collection and alerting
6. **`ar_grafana`** — Grafana dashboards
7. **`ar_loki`** — Log aggregation
8. **`ar_promtail`** — Log shipping from all containers to Loki

The AI Chat (Groq) is the only component requiring an external internet connection — all ML inference runs locally inside `ar_app`.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Socket.IO client |
| Backend | Python 3.11, Flask, Flask-SocketIO, SQLAlchemy |
| Database | PostgreSQL 15 |
| Local ML | scikit-learn (Isolation Forest), LightGBM, Facebook Prophet |
| AI Chat | Groq API — `llama-3.3-70b-versatile` (external, free tier) |
| Observability | Prometheus, Grafana, Loki, Promtail |
| Infrastructure | Docker Compose, Terraform (AWS EC2 t2.micro), GitHub Actions |

## API Endpoints

**Health & Incidents**
- `GET /health` — Full system health JSON
- `GET /api/incidents?status=active&severity=critical` — Filtered incident list
- `POST /api/remediation/manual` — Trigger manual remediation

**ML & AI**
- `POST /api/ml/chat` — AI Chat (requires `GROQ_API_KEY`)
- `POST /api/ml/predict/anomaly` — Run anomaly detection
- `GET /api/ml/forecast/predict?target_metric=cpu&hours_ahead=6` — Time-series forecast
- `POST /api/ml/failure-prediction/predict` — Failure risk prediction
- `GET /api/ml/metrics/export?format=csv` — Export metrics data
- `GET /api/ml/models` — List all trained ML models

Interactive API docs available at `http://localhost:5000/api/docs` (Swagger UI).

## Quick Start

```bash
# 1. Clone
git clone https://github.com/mainulhossain123/infra-autofix-agent.git
cd infra-autofix-agent

# 2. Configure — minimum required for AI chat:
cp .env.example .env
# Set GROQ_API_KEY=your_key_here  (free at console.groq.com)

# 3. Start all services
docker compose up -d

# 4. Access
# Dashboard:   http://localhost:3000
# AI Chat:     http://localhost:3000/chat
# API Docs:    http://localhost:5000/api/docs
# Grafana:     http://localhost:3001  (admin/admin)
# Prometheus:  http://localhost:9090
```

## AWS Deployment

The project ships Terraform infrastructure and two GitHub Actions workflows for deploying to AWS EC2 free tier:

- **Deploy Infrastructure (Terraform)**: Provisions EC2 `t2.micro`, Elastic IP, and security group in `ap-southeast-1`. Triggered via Actions or auto-triggers on `terraform/` changes.
- **Deploy App to EC2**: SSHs into the instance, does `git pull` and rebuilds all containers with the production Docker Compose override (memory limits, no external PostgreSQL port, `FLASK_ENV=production`).

```
GitHub → Actions → "Deploy Infrastructure (Terraform)" → apply
GitHub → Actions → "Deploy App to EC2" → Run workflow
```

## Results & Impact

- **Reduced MTTR**: Automated recovery cuts mean time to recovery without on-call intervention
- **Proactive Detection**: ML models flag anomalies and forecast failures hours before thresholds breach
- **AI-Assisted Ops**: Natural language interface for incident analysis and troubleshooting
- **Production-Grade**: Circuit breaker, audit logs, configurable thresholds, memory-limited containers
- **Cloud Ready**: One-command AWS deployment with full IaC via Terraform

## Documentation

- [API Reference](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/API.md)
- [Operations Guide](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/operations.md)
- [Docker Guide](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/docker.md)
- [Kubernetes Guide](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/kubernetes.md)

---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3">
        <a href="https://github.com/mainulhossain123/infra-autofix-agent" class="btn btn-primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    </div>
</div>
