import { useState } from 'react'
import './App.css'

const INITIAL_SERVICES = [
  { id: 'auth', name: 'Identity & Auth Service', version: 'v2.4.1', pods: '4/4', latency: '12ms', status: 'healthy' },
  { id: 'gateway', name: 'Edge API Gateway', version: 'v3.1.0', pods: '12/12', latency: '8ms', status: 'healthy' },
  { id: 'payments', name: 'Transactions Engine', version: 'v1.9.4', pods: '6/6', latency: '24ms', status: 'healthy' },
  { id: 'vector', name: 'Vector AI Search Shard', version: 'v0.8.2', pods: '3/3', latency: '19ms', status: 'healthy' },
]

const INITIAL_LOGS = [
  { id: 1, type: 'deploy', time: '11:14:02', title: 'Continuous Deployment', message: 'Release artifact v2.4.1 successfully activated across all clusters.' },
  { id: 2, type: 'traffic', time: '11:12:45', title: 'Autoscaler Triggered', message: 'Traffic ramp detected in eu-central-1. Scaled gateway pods 8 -> 12.' },
  { id: 3, type: 'alert', time: '11:10:18', title: 'TLS Certificate Renewal', message: 'Automated certificate renewal completed for *.cloudpulse.io (Let\'s Encrypt).' },
  { id: 4, type: 'deploy', time: '11:08:30', title: 'Health Probe Verified', message: 'Global HTTP /healthz probe passed with 100% availability across 16 edges.' }
]

const REGIONS = [
  { id: 'us-east-1', name: 'US-East (N. Virginia)', baseLatency: 14, nodes: 48 },
  { id: 'eu-central-1', name: 'EU-Central (Frankfurt)', baseLatency: 22, nodes: 32 },
  { id: 'ap-south-1', name: 'AP-South (Mumbai)', baseLatency: 38, nodes: 24 },
  { id: 'ap-northeast-1', name: 'AP-East (Tokyo)', baseLatency: 29, nodes: 28 },
]

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0])
  const [requestsPerSec, setRequestsPerSec] = useState(28420)
  const [services, setServices] = useState(INITIAL_SERVICES)
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [logFilter, setLogFilter] = useState('all')
  const [cpuLoad, setCpuLoad] = useState(44)
  const [isSpiking, setIsSpiking] = useState(false)

  // Simulate a live traffic burst
  const handleSimulateTrafficBurst = () => {
    setIsSpiking(true)
    const burstAddition = Math.floor(Math.random() * 8000) + 5000
    setRequestsPerSec(prev => prev + burstAddition)
    setCpuLoad(prev => Math.min(94, prev + 28))

    const newLog = {
      id: Date.now(),
      type: 'traffic',
      time: new Date().toLocaleTimeString(),
      title: 'Traffic Surge Simulation',
      message: `Simulated surge detected: +${burstAddition.toLocaleString()} req/s. Edge CDN load balanced smoothly.`
    }
    setLogs(prev => [newLog, ...prev])

    setTimeout(() => {
      setIsSpiking(false)
      setRequestsPerSec(28420 + Math.floor(Math.random() * 800))
      setCpuLoad(46)
    }, 3500)
  }

  // Simulate deploying a live patch
  const handleDeployPatch = () => {
    const patchVersion = `v2.4.${Math.floor(Math.random() * 9) + 2}`
    setServices(prev =>
      prev.map(s => s.id === 'gateway' ? { ...s, version: patchVersion } : s)
    )

    const deployLog = {
      id: Date.now(),
      type: 'deploy',
      time: new Date().toLocaleTimeString(),
      title: 'Live Patch Deployed',
      message: `Edge API Gateway successfully patched to ${patchVersion} via zero-downtime rolling update.`
    }
    setLogs(prev => [deployLog, ...prev])
  }

  // Toggle a service restart
  const handleRestartService = (serviceId) => {
    setServices(prev =>
      prev.map(s => (s.id === serviceId ? { ...s, status: 'restarting' } : s))
    )

    setTimeout(() => {
      setServices(prev =>
        prev.map(s => (s.id === serviceId ? { ...s, status: 'healthy' } : s))
      )
      const restartLog = {
        id: Date.now(),
        type: 'alert',
        time: new Date().toLocaleTimeString(),
        title: 'Container Restarted',
        message: `Service [${serviceId}] gracefully recycled. Fresh pod instance booted in 1.2s.`
      }
      setLogs(prev => [restartLog, ...prev])
    }, 1500)
  }

  const filteredLogs = logFilter === 'all'
    ? logs
    : logs.filter(l => l.type === logFilter)

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon" aria-label="CloudPulse Logo">⚡</div>
          <div className="brand-info">
            <h1>CloudPulse</h1>
            <p className="brand-tagline">Real-Time Cloud Telemetry &amp; Operations</p>
          </div>
        </div>

        <div className="nav-controls">
          <label htmlFor="region-selector" style={{ display: 'none' }}>Select Region</label>
          <select
            id="region-selector"
            className="region-select"
            value={selectedRegion.id}
            onChange={(e) => {
              const reg = REGIONS.find(r => r.id === e.target.value)
              if (reg) setSelectedRegion(reg)
            }}
          >
            {REGIONS.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <div className="status-indicator" data-testid="global-status">
            <span className="pulse-dot"></span>
            Operational (99.98%)
          </div>
        </div>
      </header>

      {/* Control Strip & Quick Actions */}
      <section className="control-strip">
        <div className="control-title">
          <h2>Telemetry Command Hub</h2>
          <p>Active Cluster: <strong>{selectedRegion.name}</strong> &bull; {selectedRegion.nodes} Connected Edge Nodes</p>
        </div>
        <div className="actions-group">
          <button
            className="btn btn-cyan"
            onClick={handleSimulateTrafficBurst}
            disabled={isSpiking}
          >
            {isSpiking ? '⚡ Simulating Surge...' : '📈 Simulate Traffic Surge'}
          </button>
          <button className="btn btn-purple" onClick={handleDeployPatch}>
            🚀 Trigger Rolling Deploy
          </button>
        </div>
      </section>

      {/* Key Telemetry Stats */}
      <section className="telemetry-grid">
        <div className="telemetry-card">
          <div className="card-header">
            <span className="card-label">Throughput</span>
            <span className="card-icon">⚡</span>
          </div>
          <div className="metric-val">{requestsPerSec.toLocaleString()}</div>
          <div className="metric-trend trend-up">
            ▲ +14.2% vs last hour
          </div>
        </div>

        <div className="telemetry-card">
          <div className="card-header">
            <span className="card-label">Avg P99 Latency</span>
            <span className="card-icon">⏱️</span>
          </div>
          <div className="metric-val">{selectedRegion.baseLatency} ms</div>
          <div className="metric-trend trend-neutral">
            Global Edge Caching Active
          </div>
        </div>

        <div className="telemetry-card">
          <div className="card-header">
            <span className="card-label">Error Rate</span>
            <span className="card-icon">🛡️</span>
          </div>
          <div className="metric-val">0.001%</div>
          <div className="metric-trend trend-up">
            ✓ Nominal Zero Ingress Errors
          </div>
        </div>

        <div className="telemetry-card">
          <div className="card-header">
            <span className="card-label">Cluster CPU Load</span>
            <span className="card-icon">📊</span>
          </div>
          <div className="metric-val">{cpuLoad}%</div>
          <div className="metric-trend trend-neutral">
            Autoscaling Threshold: 80%
          </div>
        </div>
      </section>

      {/* Capacity & Compute Gauges */}
      <section className="capacity-grid">
        <div className="capacity-card">
          <div className="capacity-head">
            <span>Cluster Compute Pool</span>
            <strong>{cpuLoad}% Allocated</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill fill-cyan" style={{ width: `${cpuLoad}%` }}></div>
          </div>
        </div>

        <div className="capacity-card">
          <div className="capacity-head">
            <span>Memory Utilization</span>
            <strong>58% (37.1 GB / 64 GB)</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill fill-purple" style={{ width: '58%' }}></div>
          </div>
        </div>

        <div className="capacity-card">
          <div className="capacity-head">
            <span>Egress Bandwidth</span>
            <strong>3.4 Gbps / 10 Gbps</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill fill-emerald" style={{ width: '34%' }}></div>
          </div>
        </div>
      </section>

      {/* Main Two-Column View: Microservices & Event Stream */}
      <div className="main-grid">
        {/* Microservices Fleet */}
        <section className="section-card">
          <div className="section-head">
            <h3>🖥️ Microservices Fleet</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>4 Active Services</span>
          </div>

          <div className="services-list">
            {services.map((svc) => (
              <div key={svc.id} className="service-item" data-testid={`service-${svc.id}`}>
                <div className="service-meta">
                  <span className={`service-dot ${svc.status === 'healthy' ? 'dot-green' : 'dot-amber'}`}></span>
                  <div className="service-info">
                    <h4>{svc.name}</h4>
                    <p>{svc.version} &bull; Latency: {svc.latency}</p>
                  </div>
                </div>

                <div className="service-stats">
                  <span className="stat-pill">{svc.pods} Pods</span>
                  <button
                    className="toggle-btn"
                    onClick={() => handleRestartService(svc.id)}
                    disabled={svc.status === 'restarting'}
                  >
                    {svc.status === 'restarting' ? 'Recycling...' : '↻ Restart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Activity Stream */}
        <section className="section-card">
          <div className="section-head">
            <h3>📡 Live Event Stream</h3>
            <div className="log-filters">
              <button
                className={`filter-btn ${logFilter === 'all' ? 'active' : ''}`}
                onClick={() => setLogFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${logFilter === 'deploy' ? 'active' : ''}`}
                onClick={() => setLogFilter('deploy')}
              >
                Deploys
              </button>
              <button
                className={`filter-btn ${logFilter === 'traffic' ? 'active' : ''}`}
                onClick={() => setLogFilter('traffic')}
              >
                Traffic
              </button>
            </div>
          </div>

          <div className="log-stream" data-testid="log-stream">
            {filteredLogs.map((log) => (
              <div key={log.id} className={`log-entry ${log.type}`}>
                <div className="log-top">
                  <strong>{log.title}</strong>
                  <span>{log.time}</span>
                </div>
                <div className="log-msg">{log.message}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Bar */}
      <footer className="footer-bar">
        <div className="footer-left">
          <span>CloudPulse Telemetry Engine</span>
          <span className="version-pill">v2.4.1</span>
        </div>
        <div>
          <span>Region Ping: <strong>{selectedRegion.baseLatency}ms</strong> &bull; Zero Ingress Dropped</span>
        </div>
      </footer>
    </div>
  )
}
