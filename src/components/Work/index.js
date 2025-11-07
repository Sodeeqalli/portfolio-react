import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faBriefcase, faStar } from '@fortawesome/free-solid-svg-icons'

const minYear = 2004
const maxYear = 2025

const timelineEvents = [
  {
    year: 2004,
    title: 'Hello World 🌍',
    description: 'Born in Lagos, Nigeria and instantly surrounded by curiosity and rhythm.',
    type: 'milestone',
  },
  {
    year: 2010,
    title: 'First Classroom Adventure',
    description: 'Started primary school, leading every group science project I could join.',
    type: 'school',
  },
  {
    year: 2013,
    title: 'Tinkering with Tech',
    description: 'Pulled apart a family computer to understand how the magic worked (and successfully reassembled it!).',
    type: 'milestone',
  },
  {
    year: 2016,
    title: 'STEM High School',
    description: 'Enrolled in a science-focused secondary school and dove deep into math, physics, and robotics.',
    type: 'school',
  },
  {
    year: 2019,
    title: 'Code Club Captain',
    description: 'Organised after-school coding meetups and guided classmates through HTML, CSS, and basic Python.',
    type: 'milestone',
  },
  {
    year: 2021,
    title: 'Computer Science Undergraduate',
    description: 'Began BSc studies, focusing on software engineering, algorithms, and cloud architecture.',
    type: 'school',
  },
  {
    year: 2022,
    title: 'Cloud Engineering Intern',
    description: 'Automated cloud infrastructure, writing IaC templates and ensuring deployments were reproducible.',
    type: 'work',
  },
  {
    year: 2023,
    title: 'Full-Stack Product Intern',
    description: 'Shipped React/Node features and implemented observability for more reliable user experiences.',
    type: 'work',
  },
  {
    year: 2024,
    title: 'Community Builder',
    description: 'Hosted workshops on cloud-native patterns and mentored new developers entering tech.',
    type: 'milestone',
  },
  {
    year: 2025,
    title: 'Software & Cloud Engineer',
    description: 'Designing resilient systems, advising teams on architecture, and constantly learning the next big thing.',
    type: 'work',
  },
]

const eventIcons = {
  school: faSchool,
  work: faBriefcase,
  milestone: faStar,
}

const stageNarratives = [
  { maxAge: 2, label: 'Infant Explorer', note: 'Tiny footsteps and endless wonder.' },
  { maxAge: 6, label: 'Curious Kid', note: 'Asking why about everything under the sun.' },
  { maxAge: 12, label: 'Young Tinkerer', note: 'Building, breaking, and rebuilding gadgets.' },
  { maxAge: 18, label: 'STEM Trailblazer', note: 'Leading school teams and STEM initiatives.' },
  { maxAge: 22, label: 'Emerging Engineer', note: 'Leveling up through university labs and internships.' },
  { maxAge: 40, label: 'Systems Craftsman', note: 'Designing cloud-native journeys with confidence.' },
]

const Work = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [currentYear, setCurrentYear] = useState(minYear)
  const [eventToast, setEventToast] = useState(null)
  const toastTimeoutRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = null
    }
    const match = timelineEvents.find(event => event.year === currentYear)
    if (match) {
      setEventToast(match)
      toastTimeoutRef.current = setTimeout(() => {
        setEventToast(null)
        toastTimeoutRef.current = null
      }, 4200)
    } else {
      setEventToast(null)
    }
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
        toastTimeoutRef.current = null
      }
    }
  }, [currentYear])

  const age = currentYear - minYear
  const growthProgress = (currentYear - minYear) / (maxYear - minYear)
  const growthScale = 0.65 + growthProgress * 0.8
  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentYear - minYear) / (maxYear - minYear)) * 100)
  )

  const stage = useMemo(() => {
    return stageNarratives.find(item => age <= item.maxAge) ?? stageNarratives[stageNarratives.length - 1]
  }, [age])

  const handleMarkerSelect = useCallback(year => {
    setCurrentYear(year)
  }, [])

  return (
    <div className='container work-page'>
      <div className='text-zone'>
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={[...'Life Journey']}
            idx={15}
          />
        </h1>
        <p className='journey-intro'>
          Slide through the years to watch my story unfold. Every step unlocks a checkpoint—from first classrooms and
          hackathons to shipping production-ready cloud solutions in 2025.
        </p>

        <div className='timeline-card'>
          <div className='growth-panel'>
            <div className='growth-figure'>
              <div className='growth-person' style={{ '--growth-scale': growthScale }} />
            </div>
            <div className='growth-status'>
              <span className='stage-label'>{stage.label}</span>
              <span className='stage-note'>{stage.note}</span>
              <span className='current-year'>Year: {currentYear}</span>
              <span className='current-age'>Age: {age}</span>
            </div>
          </div>

          <div className='timeline-panel'>
            <div className='timeline-track' aria-hidden='true'>
              <div className='timeline-progress' style={{ width: `${progressPercent}%` }} />
              {timelineEvents.map(event => (
                <button
                  key={event.year}
                  type='button'
                  className={`timeline-marker ${currentYear >= event.year ? 'is-unlocked' : ''} ${
                    currentYear === event.year ? 'is-active' : ''
                  }`}
                  style={{ left: `${((event.year - minYear) / (maxYear - minYear)) * 100}%` }}
                  onClick={() => handleMarkerSelect(event.year)}
                  aria-label={`Jump to ${event.year}: ${event.title}`}
                >
                  <span className='marker-dot' />
                  <span className='marker-year'>{event.year}</span>
                </button>
              ))}
            </div>

            <div className='timeline-controls'>
              <span className='year-start'>{minYear}</span>
              <input
                type='range'
                min={minYear}
                max={maxYear}
                step={1}
                value={currentYear}
                onChange={event => setCurrentYear(Number(event.target.value))}
                aria-label='Select a year to explore the journey'
                className='timeline-slider'
              />
              <span className='year-end'>{maxYear}</span>
            </div>
          </div>
        </div>

        <div className='timeline-legend'>
          <span><FontAwesomeIcon icon={faSchool} /> School</span>
          <span><FontAwesomeIcon icon={faBriefcase} /> Work</span>
          <span><FontAwesomeIcon icon={faStar} /> Milestone</span>
        </div>

        {eventToast && (
          <div className={`event-toast type-${eventToast.type}`}>
            <div className='event-icon'>
              <FontAwesomeIcon icon={eventIcons[eventToast.type] ?? faStar} />
            </div>
            <div className='event-copy'>
              <span className='event-year'>{eventToast.year}</span>
              <h3>{eventToast.title}</h3>
              <p>{eventToast.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Work
