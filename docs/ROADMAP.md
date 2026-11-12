# DevOps Engineering Program: Course Roadmap

This roadmap outlines the complete learning progression for students in the DevOps Engineering Program, starting from foundational source control to enterprise-scale Kubernetes and Cloud Infrastructure.

---

## 🗺️ Progression Path

```mermaid
flowchart TD
    M1["Module 1: Git & Source Code Governance\n• Git branching strategies (GitFlow/Trunk-based)\n• Pull Requests & Code Reviews\n• Conventional Commits"]
    M2["Module 2: CI/CD Pipeline Automation\n• GitHub Actions workflows\n• Quality Gates (Lint, Unit Test, Build)\n• Build Artifacts & Automated Releases"]
    M3["Module 3: Containerization & Docker\n• Multi-stage Dockerfiles\n• Docker Compose multi-service environments\n• Container Security & Image Optimization"]
    M4["Module 4: Container Orchestration (Kubernetes)\n• Pods, Deployments & Services\n• ConfigMaps & Secrets management\n• Ingress Controllers & Helm Charts"]
    M5["Module 5: Infrastructure as Code (IaC)\n• Terraform fundamentals & state management\n• Cloud provisioning (AWS / Azure / GCP)\n• CI/CD for Infrastructure (GitOps with Atlantis/ArgoCD)"]
    M6["Module 6: Observability, SRE & Operations\n• Monitoring (Prometheus & Grafana)\n• Centralized Logging (Loki / ELK)\n• SLI / SLO / SLA & Incident Management"]

    M1 --> M2 --> M3 --> M4 --> M5 --> M6
```

---

## Detailed Curriculum Breakdown

### 📍 Phase 1: Foundations (Current Repository Scope)
- **Status:** Active / Ready
- **Key Concepts:**
  - React Single Page App architecture
  - Static Code Analysis (Oxlint/ESLint)
  - Automated Unit Testing (Vitest + Testing Library)
  - GitHub Actions Multi-stage Pipeline
  - Docker multi-stage build & Nginx deployment

### 📍 Phase 2: Backend Integration & Multi-Service CI/CD
- **Status:** Planned
- **Upcoming Deliverables:**
  - Add `backend/` microservice (Node.js Express / Python FastAPI)
  - Automated API tests (Supertest / Pytest)
  - Docker Compose orchestrating frontend + backend + database

### 📍 Phase 3: Cloud & GitOps Deployment
- **Status:** Planned
- **Upcoming Deliverables:**
  - Kubernetes manifests (`k8s/deployment.yaml`, `k8s/service.yaml`)
  - Automated deployment to local Minikube / K3s / Cloud EKS/GKE
  - ArgoCD GitOps Continuous Delivery integration
