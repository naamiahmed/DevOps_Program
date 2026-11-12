import { useState } from 'react'
import './App.css'

const PIPELINE_STAGES = [
  { id: 1, name: 'Code Quality', command: 'npm run lint', desc: 'Checks syntax, ESLint/Oxlint rules, and style consistency.' },
  { id: 2, name: 'Unit Testing', command: 'npm test:run', desc: 'Runs Vitest automated assertions to guarantee logic correctness.' },
  { id: 3, name: 'Build & Bundle', command: 'npm run build', desc: 'Compiles and minifies React assets into production dist/ folder.' },
  { id: 4, name: 'Security Audit', command: 'npm audit', desc: 'Scans all npm dependencies for known CVE vulnerabilities.' },
  { id: 5, name: 'Containerization', command: 'docker build', desc: 'Packages optimized dist/ with Nginx in multi-stage Alpine image.' },
  { id: 6, name: 'Deploy / Release', command: 'gh-pages / cloud', desc: 'Deploys immutable release artifact to target hosting.' }
]

const COURSE_MODULES = [
  {
    module: 'Module 01',
    title: 'Version Control & Git Governance',
    desc: 'Master branch strategies, Pull Requests, trunk-based development, and semantic commits.',
    skills: ['Git Flow', 'PR Reviews', 'Merge Strategies', 'Branch Rules']
  },
  {
    module: 'Module 02',
    title: 'Automated CI/CD Pipelines',
    desc: 'Build multi-stage GitHub Actions workflows with isolated test, build, and deploy jobs.',
    skills: ['GitHub Actions', 'Artifact Management', 'Secrets', 'Failure Gates']
  },
  {
    module: 'Module 03',
    title: 'Docker & Containerization',
    desc: 'Package applications using multi-stage builds, Nginx runtime, and Docker Compose.',
    skills: ['Multi-Stage Builds', 'Layer Caching', 'Docker Compose', 'Security']
  },
  {
    module: 'Module 04',
    title: 'Kubernetes Orchestration',
    desc: 'Deploy and scale microservices with Pods, Deployments, Services, and Helm charts.',
    skills: ['K8s Deployments', 'Cluster Networking', 'Ingress', 'Helm']
  },
  {
    module: 'Module 05',
    title: 'Infrastructure as Code (IaC)',
    desc: 'Provision reproducible cloud infrastructure using declarative Terraform configs.',
    skills: ['Terraform', 'State Management', 'Cloud Providers', 'GitOps']
  },
  {
    module: 'Module 06',
    title: 'Observability & SRE Operations',
    desc: 'Monitor health, query metrics, centralize logs, and establish SLI/SLO standards.',
    skills: ['Prometheus', 'Grafana', 'Log Aggregation', 'SLI / SLO']
  }
]

const CURRENT_YEAR = new Date().getFullYear()

export default function App() {
  const [activeStage, setActiveStage] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [completedStages, setCompletedStages] = useState([])

  const startPipelineSimulation = async () => {
    setIsSimulating(true)
    setCompletedStages([])
    setActiveStage(null)

    for (let i = 0; i < PIPELINE_STAGES.length; i++) {
      setActiveStage(PIPELINE_STAGES[i].id)
      await new Promise(resolve => setTimeout(resolve, 800))
      setCompletedStages(prev => [...prev, PIPELINE_STAGES[i].id])
    }

    setActiveStage(null)
    setIsSimulating(false)
  }

  const resetPipeline = () => {
    setCompletedStages([])
    setActiveStage(null)
    setIsSimulating(false)
  }

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="logo-area">
          <div className="logo-icon" aria-label="DevOps Logo">🚀</div>
          <div className="title-group">
            <h1>DevOps Engineering Program</h1>
            <p className="subtitle">Foundations of Continuous Integration, Delivery & Cloud Engineering</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge badge-success">
            <span className="pulse-dot"></span>
            CI/CD: Healthy
          </span>
          <span className="badge badge-info">
            Env: Demo / Staging
          </span>
          <span className="badge badge-version">
            v1.0.0
          </span>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <section className="hero-card">
        <h2>Welcome, Future DevOps Engineers!</h2>
        <p>
          This repository is your practical launchpad. You will learn how modern engineering teams automate the journey from a developer&apos;s <code>git push</code> all the way to verified production release.
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">6 Jobs</span>
            <span className="stat-label">CI/CD Pipeline Stages</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100%</span>
            <span className="stat-label">Automated Delivery</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">Alpine Nginx</span>
            <span className="stat-label">Production Container</span>
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Visualizer */}
      <section className="simulator-box" aria-labelledby="pipeline-sim-heading">
        <div className="section-title">
          <h2 id="pipeline-sim-heading">Interactive CI/CD Pipeline Visualizer</h2>
          <div className="sim-controls">
            <button
              className="btn btn-primary"
              onClick={startPipelineSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? 'Running Pipeline...' : '▶ Simulate CI/CD Run'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={resetPipeline}
              disabled={isSimulating && completedStages.length === 0}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="pipeline-steps">
          {PIPELINE_STAGES.map((stage) => {
            const isRunning = activeStage === stage.id
            const isSuccess = completedStages.includes(stage.id)
            let statusText = 'Pending'
            let cardClass = 'step-card idle'

            if (isRunning) {
              statusText = 'Running...'
              cardClass = 'step-card running'
            } else if (isSuccess) {
              statusText = 'Passed ✓'
              cardClass = 'step-card success'
            }

            return (
              <div key={stage.id} className={cardClass} data-testid={`stage-${stage.id}`}>
                <div className="step-header">
                  <span className="step-number">Stage 0{stage.id}</span>
                  <span className="step-status">{statusText}</span>
                </div>
                <div className="step-name">{stage.name}</div>
                <div className="step-desc">{stage.desc}</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <code>{stage.command}</code>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Terminal Quick-Start Box */}
      <section className="terminal-box">
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="terminal-title">Student Workstation Terminal Commands</span>
        </div>
        <div className="command-row">
          <span>cd frontend &amp;&amp; npm install &amp;&amp; npm run dev</span>
          <span className="command-action">Start local development server</span>
        </div>
        <div className="command-row">
          <span>cd frontend &amp;&amp; npm test:run</span>
          <span className="command-action">Run automated unit tests</span>
        </div>
        <div className="command-row">
          <span>cd frontend &amp;&amp; npm run build</span>
          <span className="command-action">Compile production bundle</span>
        </div>
        <div className="command-row">
          <span>docker compose up --build</span>
          <span className="command-action">Launch containerized Nginx website</span>
        </div>
      </section>

      {/* Curriculum Modules */}
      <div className="section-title">
        <h2>DevOps Curriculum Modules</h2>
      </div>
      <section className="curriculum-grid">
        {COURSE_MODULES.map((mod) => (
          <div key={mod.module} className="module-card">
            <span className="module-tag">{mod.module}</span>
            <h3>{mod.title}</h3>
            <p>{mod.desc}</p>
            <div className="skills-list">
              {mod.skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#docs" onClick={(e) => { e.preventDefault(); alert('Refer to docs/HLS_ARCHITECTURE.md in the repo root!'); }}>
            Architecture Doc (HLS)
          </a>
          <a href="#guide" onClick={(e) => { e.preventDefault(); alert('Refer to docs/STUDENT_GUIDE.md for hands-on labs!'); }}>
            Student Lab Guide
          </a>
          <a href="#roadmap" onClick={(e) => { e.preventDefault(); alert('Refer to docs/ROADMAP.md for curriculum milestones!'); }}>
            Curriculum Roadmap
          </a>
        </div>
        <p>DevOps Engineering Training Program &copy; {CURRENT_YEAR} - Built for Hands-on Learning</p>
      </footer>
    </div>
  )
}
