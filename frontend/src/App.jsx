import { useState } from 'react'
import './App.css'

// =============================================================================
// 💡 STUDENTS LAB TASK 1: ADD OR CHANGE A JOKE HERE!
// Change any setup or punchline, save, and watch your changes deploy!
// =============================================================================
const DEV_JOKES = [
  {
    id: 1,
    setup: 'Why do programmers always prefer dark mode?',
    punchline: 'Because light attracts bugs! 🪲'
  },
  {
    id: 2,
    setup: 'There are only 10 types of people in the world...',
    punchline: 'Those who understand binary, and those who don\'t! 🤖'
  },
  {
    id: 3,
    setup: 'Why was the JavaScript developer sad?',
    punchline: 'Because they didn\'t Node how to Express themselves! 📦'
  },
  {
    id: 4,
    setup: 'A SQL query walks into a bar, walks up to two tables and asks...',
    punchline: '"Can I JOIN you?" 🍻'
  },
  {
    id: 5,
    setup: 'How many programmers does it take to change a lightbulb?',
    punchline: 'None. That\'s a hardware problem! 💡'
  }
]

// =============================================================================
// 💡 STUDENTS LAB TASK 2: CUSTOMIZE THE COFFEE STATUS MESSAGES!
// =============================================================================
const COFFEE_MESSAGES = [
  '😴 Zombie Mode: Cannot process Git commands. Need coffee immediately!',
  '☕ Cup 1: Compiling... Hello World is looking good.',
  '⚡ Cup 2: In the zone! Writing 50 lines of untested code with supreme confidence.',
  '🚀 Cup 3: Terminal wizard! Committing straight to main!',
  '🔥 Cup 4+: Ascended being! Talking directly to the CPU in binary!'
]

export default function App() {
  // Current Joke State
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0)
  const [showPunchline, setShowPunchline] = useState(false)

  // Coffee Meter State
  const [coffeeCount, setCoffeeCount] = useState(1)

  // Bug or Feature Poll State
  const [bugVotes, setBugVotes] = useState(42)
  const [featureVotes, setFeatureVotes] = useState(128)
  const [userVoted, setUserVoted] = useState(null)

  // Panic Button State
  const [isPanicking, setIsPanicking] = useState(false)

  const currentJoke = DEV_JOKES[currentJokeIndex]

  const handleNextJoke = () => {
    setShowPunchline(false)
    setCurrentJokeIndex((prev) => (prev + 1) % DEV_JOKES.length)
  }

  const handleDrinkCoffee = () => {
    setCoffeeCount((prev) => prev + 1)
  }

  const handleResetCoffee = () => {
    setCoffeeCount(0)
  }

  const handleVote = (choice) => {
    if (userVoted) return
    setUserVoted(choice)
    if (choice === 'bug') {
      setBugVotes((prev) => prev + 1)
    } else {
      setFeatureVotes((prev) => prev + 1)
    }
  }

  const getCoffeeStatus = () => {
    if (coffeeCount === 0) return COFFEE_MESSAGES[0]
    if (coffeeCount === 1) return COFFEE_MESSAGES[1]
    if (coffeeCount === 2) return COFFEE_MESSAGES[2]
    if (coffeeCount === 3) return COFFEE_MESSAGES[3]
    return COFFEE_MESSAGES[4]
  }

  return (
    <div className="app-wrapper">
      {/* Friendly Header */}
      <header className="top-header">
        <div className="brand-badge">
          <span>🚀 Deploying on Friday</span>
          <span>&bull;</span>
          <span>What could possibly go wrong?</span>
        </div>
        <h1 className="main-title">GitHappens ☕</h1>
        <p className="main-subtitle">Turning coffee into code, bugs, and laughs since 2026</p>
      </header>

      <div className="cards-grid">
        {/* Card 1: Interactive Dev Joke */}
        <section className="fun-card" aria-labelledby="joke-heading">
          <div className="card-title-row">
            <h2 id="joke-heading">🎭 Developer Comedy Club</h2>
            <span className="tag-pill">Joke #{currentJoke.id} of {DEV_JOKES.length}</span>
          </div>

          <p className="joke-setup">{currentJoke.setup}</p>

          {showPunchline ? (
            <div className="punchline-box" data-testid="punchline-box">
              {currentJoke.punchline}
            </div>
          ) : null}

          <div className="joke-actions">
            {!showPunchline ? (
              <button
                className="btn btn-primary"
                onClick={() => setShowPunchline(true)}
              >
                🥁 Reveal Punchline
              </button>
            ) : (
              <button
                className="btn btn-purple"
                onClick={handleNextJoke}
              >
                Next Joke 🔄
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={handleNextJoke}
            >
              Skip ⏭️
            </button>
          </div>
        </section>

        {/* Card 2: Interactive Coffee-O-Meter */}
        <section className="fun-card" aria-labelledby="coffee-heading">
          <div className="card-title-row">
            <h2 id="coffee-heading">☕ Coffee-O-Meter</h2>
            <span className="tag-pill">Developer Fuel</span>
          </div>

          <div className="coffee-layout">
            <div className="coffee-icon-box" aria-hidden="true">
              {coffeeCount === 0 ? '😴' : coffeeCount >= 4 ? '🔥' : '☕'}
            </div>
            <div className="coffee-info">
              <div className="coffee-count-text">
                {coffeeCount} {coffeeCount === 1 ? 'Cup' : 'Cups'} of Coffee Drank
              </div>
              <p className="coffee-status-msg" data-testid="coffee-status">
                {getCoffeeStatus()}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleDrinkCoffee}>
                  ☕ Drink Another Cup
                </button>
                <button className="btn btn-secondary" onClick={handleResetCoffee}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Card 3: Interactive Poll: Bug or Feature? */}
        <section className="fun-card" aria-labelledby="poll-heading">
          <div className="card-title-row">
            <h2 id="poll-heading">🗳️ The Eternal Debate</h2>
            <span className="tag-pill">Community Poll</span>
          </div>

          <p className="poll-question">
            &ldquo;The code works completely fine on my localhost, but immediately crashes on the server.&rdquo;
          </p>

          <div className="poll-options">
            <button
              className={`poll-btn ${userVoted === 'bug' ? 'voted-bug' : ''}`}
              onClick={() => handleVote('bug')}
            >
              <span>🐛 Obviously a Bug</span>
              <span className="vote-tally">{bugVotes} Votes</span>
            </button>

            <button
              className={`poll-btn ${userVoted === 'feature' ? 'voted-feature' : ''}`}
              onClick={() => handleVote('feature')}
            >
              <span>✨ Undocumented Feature</span>
              <span className="vote-tally">{featureVotes} Votes</span>
            </button>
          </div>

          {userVoted ? (
            <p style={{ textAlign: 'center', color: '#10b981', fontWeight: 700 }}>
              🎉 Thanks for voting! Your vote has been counted.
            </p>
          ) : null}
        </section>

        {/* Card 4: Friday Production Panic Button */}
        <section className="fun-card" aria-labelledby="panic-heading">
          <div className="card-title-row">
            <h2 id="panic-heading">🚨 Production Emergency</h2>
            <span className="tag-pill" style={{ background: '#fee2e2', color: '#dc2626' }}>Do Not Press</span>
          </div>

          {!isPanicking ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
                Did someone accidentally merge to <code>main</code> at 4:59 PM on Friday?
              </p>
              <button
                className="btn btn-danger"
                style={{ fontSize: '1.1rem', padding: '0.85rem 2rem' }}
                onClick={() => setIsPanicking(true)}
              >
                🚨 Press The Panic Button
              </button>
            </div>
          ) : (
            <div className="panic-banner" data-testid="panic-banner">
              <h3>🔥 DON&apos;T PANIC!</h3>
              <p>Everything is fine! Initiating emergency rollback... It totally works on my machine anyway! 🐕☕</p>
              <button
                className="btn btn-secondary"
                style={{ marginTop: '1rem' }}
                onClick={() => setIsPanicking(false)}
              >
                Phew, False Alarm! Relieve Panic 😌
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Helpful note for students to learn how changing code triggers CI/CD */}
      <div className="code-hint-box">
        💡 <strong>Students:</strong> Open <code>frontend/src/App.jsx</code>, add your own custom joke to <code>DEV_JOKES</code>, and push to GitHub. Watch your joke go live in GitHub Actions!
      </div>

      {/* Cheerful Footer */}
      <footer className="footer">
        <p>Made with ☕, ❤️, and zero git merge conflicts.</p>
        <span className="version-badge">Version 1.0.0</span>
      </footer>
    </div>
  )
}
