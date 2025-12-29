---
layout: page
title: Infrastructure Self-Healing Agent
description: Auto-remediation bot that detects application failures, triggers automated recovery, and sends real-time incident notifications
img: assets/img/template_error.jpg
importance: 1
category: work
github: https://github.com/mainulhossain123/infra-autofix-agent
---

## Overview

The Infrastructure Self-Healing Agent is a production-oriented auto-remediation system designed for containerized services. It monitors applications, detects incidents (crashes, high error rates, CPU spikes, high latency), and performs intelligent remediation actions with built-in safety mechanisms to prevent restart loops.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/template_error.jpg" title="Infrastructure Monitoring" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real-time infrastructure monitoring and automated incident response
</div>

## Key Features

### Intelligent Detection
- **Crash Detection**: Automatically identifies service failures and container crashes
- **Performance Monitoring**: Tracks CPU usage, memory consumption, and response latency
- **Error Rate Analysis**: Monitors application error rates and anomalies
- **Circuit Breaker**: Prevents remediation loops with configurable cooldown periods

### Automated Remediation
- **Safe Container Restarts**: Performs automated recovery with rate limiting (max 3 restarts per 5 minutes)
- **Incident Logging**: Stores all incidents and actions in PostgreSQL for audit trails
- **Real-time Notifications**: WebSocket-based updates to React dashboard
- **Manual Override**: API endpoints for manual intervention when needed

### Observability Stack
- **Prometheus Integration**: Exposes metrics in Prometheus format for monitoring
- **Real-time Dashboard**: React-based UI with live incident tracking
- **API Access**: RESTful API for incident history and remediation management
- **Comprehensive Logging**: Detailed logs for troubleshooting and analysis

## Architecture

The system comprises five main services:

1. **Flask Backend** (`ar_app`): REST API, metrics endpoint, and WebSocket server
2. **Remediation Bot** (`ar_bot`): Detector and remediation worker with circuit breaker logic
3. **React Dashboard** (`ar_frontend`): Real-time visualization of incidents and system health
4. **PostgreSQL Database** (`ar_postgres`): Persistent storage for incidents and configuration
5. **Prometheus** (`ar_prometheus`): Optional metrics collection and alerting

## Technology Stack

- **Backend**: Python 3.11, Flask, Flask-SocketIO, SQLAlchemy
- **Frontend**: React (Vite), Tailwind CSS
- **Database**: PostgreSQL with custom schema for incident management
- **Containerization**: Docker, Docker Compose
- **Monitoring**: Prometheus, custom metrics endpoint
- **Automation**: PowerShell and Bash scripts for operations

## Key Capabilities

### Configuration Management
All thresholds and behaviors are configurable via environment variables:
- Error rate threshold (default: 20%)
- CPU threshold (default: 80%)
- Maximum restarts per time window (default: 3 per 5 minutes)
- Cooldown period (default: 120 seconds)
- Data retention (default: 180 days)

### API Endpoints

**Health & Metrics**
- `GET /health` - Service health check
- `GET /metrics` - Prometheus-format metrics
- `GET /api/metrics` - JSON metrics

**Incident Management**
- `GET /api/incidents` - List all incidents
- `GET /api/incidents/{id}` - Get specific incident details

**Remediation**
- `GET /api/remediation/history` - Action history
- `POST /api/remediation/manual` - Trigger manual remediation

**Testing & Simulation**
- `POST /crash` - Simulate service crash
- `POST /api/trigger/cpu-spike` - Simulate CPU spike
- `POST /api/trigger/error-spike` - Simulate error spike
- `POST /api/trigger/latency-spike` - Simulate latency spike

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mainulhossain123/infra-autofix-agent.git
cd infra-autofix-agent

# Start all services with Docker Compose
docker compose up --build -d

# Access the dashboard
# Dashboard: http://localhost:3000
# API: http://localhost:5000
# Prometheus: http://localhost:9090
```

## Use Cases

- **Production Monitoring**: Continuous monitoring of microservices with automatic recovery
- **Incident Response**: Automated first-response actions to reduce MTTR
- **DevOps Automation**: Integration with CI/CD pipelines for deployment health checks
- **SRE Practice**: Demonstration of Site Reliability Engineering principles
- **Training & Testing**: Safe environment for testing incident response procedures

## Results & Impact

- **Reduced MTTR**: Automated recovery actions decrease mean time to recovery
- **24/7 Monitoring**: Continuous surveillance without manual intervention
- **Audit Trail**: Complete history of all incidents and remediation actions
- **Safety First**: Circuit breaker prevents cascade failures and restart loops
- **Observable**: Comprehensive metrics and real-time dashboards for system health

## Documentation

For detailed documentation, see:
- [API Reference](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/API.md)
- [Docker Commands](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/docker.md)
- [Operations Guide](https://github.com/mainulhossain123/infra-autofix-agent/blob/main/docs/operations.md)

---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3">
        <a href="https://github.com/mainulhossain123/infra-autofix-agent" class="btn btn-primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    </div>
</div>
