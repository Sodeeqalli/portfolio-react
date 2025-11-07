import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const sections = [
  {
    id: 'projects',
    title: 'Projects',
    actionLabel: 'View projects',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    actionLabel: 'View certifications',
  },
]

const entries = [
  {
    name: 'Cloud Expense Tracker',
    summary: 'Serverless cost dashboards with automated budget alerts and reporting.',
    story:
      'Born from monthly budget surprises, this project stitches together event-driven functions, workflow automation, and lightweight BI dashboards to surface spending anomalies in near real time. It also generates weekly digests for finance stakeholders.',
    media:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'View Case Study', href: 'https://github.com/yourusername/cloud-expense-tracker' },
    tags: ['project', 'python', 'serverless'],
  },
  {
    name: 'Realtime Fleet Monitor',
    summary: 'Live geolocation pipeline using Node.js, websockets, and MQTT brokers.',
    story:
      'Designed to coordinate field engineers, the monitor ingests vehicle telemetry via MQTT brokers, enriches it with weather alerts, and streams live status dashboards built in React. Dispatchers can replay any journey to debug incidents.',
    media:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'Watch Demo', href: 'https://fleet-monitor.example.com' },
    tags: ['project', 'node.js', 'javascript', 'iot'],
  },
  {
    name: 'AI Resume Ranker',
    summary: 'LangChain-powered evaluator that scores resumes against job descriptions.',
    story:
      'An internal hiring assistant that uses embeddings to match applicants to roles, highlight skill gaps, and suggest interview questions. Built with LangChain, Pinecone, and a FastAPI backend tuned for low-latency inference.',
    media:
      'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'Explore Repo', href: 'https://github.com/yourusername/ai-resume-ranker' },
    tags: ['project', 'python', 'ai', 'ml'],
  },
  {
    name: 'React Design System',
    summary: 'Composable component library with themed tokens and accessibility baked in.',
    story:
      'A multi-brand design system leveraging Storybook, CSS variables, and unit-tested primitives. It cut new feature build time by 30% and ensures WCAG conformance across marketing and product surfaces.',
    media:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'Browse Storybook', href: 'https://design-system.example.com' },
    tags: ['project', 'react', 'javascript', 'design'],
  },
  {
    name: 'Dart Task Companion',
    summary: 'Cross-platform productivity app syncing Flutter clients with Firebase.',
    story:
      'Personal productivity side project focussed on offline-first sync and habit loops. Built with Flutter, Firebase, and Riverpod, it keeps tasks consistent across devices even on spotty connections.',
    media:
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'See Live Build', href: 'https://task-companion.example.com' },
    tags: ['project', 'dart', 'flutter', 'firebase'],
  },
  {
    name: 'Observability Mesh',
    summary: 'Distributed tracing setup bridging OpenTelemetry collectors with Grafana dashboards.',
    story:
      'Mission was to unify metrics, logs, and traces. Implemented a Kubernetes add-on mesh that forwards telemetry to Grafana Loki and Tempo, with SLO alerts via PagerDuty and auto-remediation playbooks.',
    media:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'View Architecture', href: 'https://github.com/yourusername/observability-mesh' },
    tags: ['project', 'observability', 'devops'],
  },
  {
    name: 'Systems Design Nanodegree',
    summary: 'Capstone credential focused on distributed systems, caching, and scalability trade-offs.',
    story:
      'Completed real-world architecture labs covering load balancing, data partitioning, and chaos testing. Culminated in designing a video streaming platform with automated resilience drills.',
    media:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'View Credential', href: 'https://graduation.example.com/systems-design' },
    tags: ['certification', 'architecture'],
  },
  {
    name: 'Google Cloud Digital Leader',
    summary: 'Demonstrated cloud strategy leadership across GCP products and services.',
    story:
      'Exam covered cloud transformation case studies, data analytics, and ML strategy. It broadened my multi-cloud perspective when advising stakeholders.',
    media:
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'View Credential', href: 'https://www.credly.com/badges/google-cloud-digital-leader' },
    tags: ['certification', 'cloud', 'strategy'],
  },
  {
    name: 'Scrum Master PSM I',
    summary: 'Certified in agile facilitation, sprint planning, and continuous delivery coaching.',
    story:
      'Proved mastery of Scrum framework and facilitation techniques that keep product and engineering aligned. Helps drive predictable delivery and healthy agile rituals on complex programs.',
    media:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    cta: { label: 'View Credential', href: 'https://www.scrum.org/certification-listing' },
    tags: ['certification', 'agile', 'leadership'],
  },
]

const tagLabel = {
  project: 'Projects',
  certification: 'Certifications',
  python: 'Python',
  serverless: 'Serverless',
  'node.js': 'Node.js',
  javascript: 'JavaScript',
  iot: 'IoT',
  ai: 'AI',
  ml: 'Machine Learning',
  react: 'React',
  design: 'Design Systems',
  dart: 'Dart',
  flutter: 'Flutter',
  firebase: 'Firebase',
  observability: 'Observability',
  devops: 'DevOps',
  architecture: 'Architecture',
  cloud: 'Cloud',
  strategy: 'Strategy',
  agile: 'Agile',
  leadership: 'Leadership',
}

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [prompt, setPrompt] = useState(null)
  const [magicWord, setMagicWord] = useState('')
  const [finalOverlay, setFinalOverlay] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const passcodeInputRef = useRef(null)
  const timeoutsRef = useRef([])

  useEffect(() => {
    const timeout = setTimeout(() => setLetterClass('text-animate-hover'), 4000)
    return () => clearTimeout(timeout)
  }, [])

  const clearPromptTimeline = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setPrompt(null)
    setFinalOverlay(null)
    setMagicWord('')
    setSelectedTags([])
  }, [])

  useEffect(() => () => clearPromptTimeline(), [clearPromptTimeline])

  const fadeOutPrompt = useCallback(() => {
    setPrompt(prev => {
      if (!prev || !prev.visible) return prev
      return { ...prev, visible: false }
    })

    timeoutsRef.current.push(
      setTimeout(() => {
        setPrompt(prev => (prev && !prev.visible ? null : prev))
      }, 420)
    )
  }, [])

  const triggerProjectsSequence = useCallback(() => {
    clearPromptTimeline()

    const introDuration = 5000
    const gapShort = 700
    const readyDuration = 4000
    const passcodeDuration = 5000
    const gapToWelcome = 700
    const welcomeDuration = 5000
    const overlayDelay = 600

    const firstPrompt = {
      step: 'intro',
      kicker: 'Quest Briefing · Stage 01',
      message: "You are about to enter the vault of every project I've ever built.",
      visible: true,
    }

    setPrompt(firstPrompt)
    setMagicWord('')

    timeoutsRef.current.push(setTimeout(fadeOutPrompt, introDuration))

    const readyStart = introDuration + gapShort

    timeoutsRef.current.push(
      setTimeout(() => {
        setPrompt({
          step: 'ready',
          kicker: 'Ready Check · Stage 02',
          message: 'Strap in — are you ready for the ride?',
          visible: true,
        })
      }, readyStart)
    )

    timeoutsRef.current.push(setTimeout(fadeOutPrompt, readyStart + readyDuration))

    const passcodeStart = readyStart + readyDuration + gapShort

    timeoutsRef.current.push(
      setTimeout(() => {
        setPrompt({
          step: 'passcode',
          kicker: 'Secret Gate · Stage 03',
          message: 'Enter the magic word to unlock access:',
          visible: true,
          expectsInput: true,
        })
        requestAnimationFrame(() => {
          passcodeInputRef.current?.focus()
        })
      }, passcodeStart)
    )

    timeoutsRef.current.push(
      setTimeout(() => {
        fadeOutPrompt()
        timeoutsRef.current.push(
          setTimeout(() => {
            setPrompt({
              step: 'welcome',
              kicker: 'Final Gate · Stage 04',
              message: 'Just kidding — welcome aboard!',
              visible: true,
            })
            timeoutsRef.current.push(
              setTimeout(() => {
                fadeOutPrompt()
                timeoutsRef.current.push(
                  setTimeout(() => {
                    setFinalOverlay({ visible: true, stage: 'landing' })
                  }, overlayDelay)
                )
              }, welcomeDuration)
            )
          }, gapToWelcome)
        )
      }, passcodeStart + passcodeDuration)
    )
  }, [clearPromptTimeline, fadeOutPrompt])

  const handleFolderPress = useCallback(
    sectionId => {
      if (sectionId === 'projects') {
        triggerProjectsSequence()
      } else if (sectionId === 'certifications') {
        clearPromptTimeline()
        setSelectedTags(['certification'])
        setFinalOverlay({ visible: true, stage: 'filter' })
        setMagicWord('')
      }
    },
    [clearPromptTimeline, triggerProjectsSequence]
  )

  const handleMagicWordChange = event => {
    setMagicWord(event.target.value)
  }

  const dismissFinalOverlay = useCallback(() => {
    setFinalOverlay(prev => (prev ? { ...prev, visible: false } : prev))
    timeoutsRef.current.push(
      setTimeout(() => setFinalOverlay(null), 500)
    )
    setSelectedTags([])
  }, [])

  const skipSequence = useCallback(() => {
    clearPromptTimeline()
    setFinalOverlay({ visible: true, stage: 'landing' })
  }, [clearPromptTimeline])

  useEffect(() => {
    if (finalOverlay?.visible) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
    return undefined
  }, [finalOverlay?.visible])

  const allTags = useMemo(() => {
    const unique = new Set()
    entries.forEach(entry => {
      entry.tags.forEach(tag => unique.add(tag))
    })
    const priority = ['project', 'certification']
    return Array.from(unique).sort((a, b) => {
      const aPriority = priority.indexOf(a)
      const bPriority = priority.indexOf(b)
      if (aPriority !== -1 || bPriority !== -1) {
        return (aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority) -
          (bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority)
      }
      return a.localeCompare(b)
    })
  }, [])

  const filteredEntries = useMemo(() => {
    if (!selectedTags.length) return entries
    return entries.filter(entry =>
      selectedTags.every(tag => entry.tags.includes(tag))
    )
  }, [selectedTags])

  const toggleTag = useCallback(tag => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(item => item !== tag)
        : [...prev, tag]
    )
  }, [])

  const resetTags = useCallback(() => setSelectedTags([]), [])

  const enterVault = useCallback(() => {
    setFinalOverlay(prev =>
      prev
        ? { ...prev, stage: 'filter', visible: true }
        : { visible: true, stage: 'filter' }
    )
  }, [])

  return (
    <div className='container portfolio-page'>
      <div className='text-zone'>
        {sections.map(section => (
          <section className='portfolio-section' key={section.id}>
            <h1>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={[...section.title]}
                idx={15}
              />
            </h1>
            <button
              type='button'
              className='folder-tile'
              aria-label={section.actionLabel}
              onClick={() => handleFolderPress(section.id)}
            >
              <FontAwesomeIcon icon={faFolder} className='folder-icon' />
            </button>
          </section>
        ))}
      </div>
      {prompt && (
        <div
          className={`portfolio-prompt ${prompt.visible ? 'is-visible' : ''} prompt-${prompt.step}`}
          role='status'
          aria-live='polite'
        >
          <button
            type='button'
            className='prompt-skip'
            onClick={skipSequence}
            aria-label='Skip intro sequence'
          >
            Skip
          </button>
          <span className='prompt-kicker'>{prompt.kicker}</span>
          <span className='prompt-message'>{prompt.message}</span>
          {prompt.expectsInput ? (
            <input
              type='text'
              ref={passcodeInputRef}
              className='prompt-input'
              placeholder='hint: magic is a mindset'
              value={magicWord}
              onChange={handleMagicWordChange}
            />
          ) : (
            <span className='prompt-progress' aria-hidden='true' />
          )}
        </div>
      )}
      {finalOverlay && (
        <div className={`portfolio-final ${finalOverlay.visible ? 'is-visible' : ''}`}>
          <div className='final-inner'>
            <div className='final-header'>
              <span className='final-label'>Mission Control</span>
            </div>
            {finalOverlay.stage !== 'filter' ? (
              <>
                <h2 className='final-title'>Access Granted</h2>
                <p className='final-copy'>
                  Welcome to the core vault. Every project, certification, and battle-tested experiment lives here.
                  Choose your route and keep your curiosity dialed up.
                </p>
                <div className='final-actions'>
                  <button type='button' className='final-cta' onClick={enterVault}>
                    Enter the Vault
                  </button>
                  <button type='button' className='final-secondary' onClick={dismissFinalOverlay}>
                    Maybe Later
                  </button>
                </div>
                <div className='final-badge'>Level Up Unlocked · Stage 05</div>
              </>
            ) : (
              <div className='vault-stage'>
                <h2 className='final-title'>Vault Directory</h2>
                <p className='final-copy'>
                  Stack the filters to shape your mission. Mix categories like Projects or Certifications with tech to surface the matches you want.
                </p>
                <div className='vault-tags'>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      type='button'
                      className={`tag-pill ${selectedTags.includes(tag) ? 'is-active' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tagLabel[tag] ?? tag}
                    </button>
                  ))}
                  <button
                    type='button'
                    className='tag-pill reset-pill'
                    onClick={resetTags}
                    disabled={!selectedTags.length}
                  >
                    Reset
                  </button>
                </div>
                <div className='vault-results'>
                  {filteredEntries.length ? (
                    filteredEntries.map(entry => (
                      <article className='project-card' key={entry.name}>
                        <header className='card-header'>
                          <h3>{entry.name}</h3>
                          <p className='card-subtitle'>{entry.summary}</p>
                          <div className='project-tags'>
                            {entry.tags.map(tag => (
                              <span className='project-tag' key={tag}>
                                {tagLabel[tag] ?? tag}
                              </span>
                            ))}
                          </div>
                        </header>
                        <div className='card-body'>
                          <div className='card-media'>
                            <img
                              src={entry.media}
                              alt={`${entry.name} visual`}
                              loading='lazy'
                            />
                          </div>
                          <div className='card-content'>
                            <p className='card-story'>{entry.story}</p>
                            {entry.cta && entry.cta.href && (
                              <div className='card-footer'>
                                <a
                                  href={entry.cta.href}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='card-link'
                                >
                                  {entry.cta.label}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className='vault-empty'>
                      <p>No missions match that combo yet — try toggling a different stack.</p>
                    </div>
                  )}
                </div>
                <div className='final-actions filter-actions'>
                  <button type='button' className='final-secondary' onClick={dismissFinalOverlay}>
                    Return to Hangar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio
