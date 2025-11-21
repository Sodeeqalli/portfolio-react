import { useEffect, useRef, useState } from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faInstagram, faDiscord, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import PortraitOne from '../../assets/images/IMG_9488.JPG'
import PortraitTwo from '../../assets/images/IMG_9517.JPG'
import PortraitThree from '../../assets/images/IMG_9524.JPG'
import LogoKdn from '../../assets/images/kdn.jpeg'
import LogoGdg from '../../assets/images/GDG Babcock.jpeg'
import LogoUfit from '../../assets/images/ufitfly.jpeg'
import LogoSchulich from '../../assets/images/schulich.jpeg'
import LogoNsbe from '../../assets/images/nsbe.jpeg'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const lerp = (start, end, progress) => start + (end - start) * progress

const services = [
  'Software Engineering',
  'Solutions Architecture',
  'Cloud Engineering',
  'Machine Learning & Big Data',
]

const experiences = [
  {
    company: 'Schulich Ignite · UofC ',
    role: 'Python Mentor',
    dates: 'Sep 2025 – Present · Calgary, CA',
    logoImage: LogoSchulich,
    backgroundSize: '80%',
  },
  {
    company: 'NSBE · UofC',
    role: 'Software Engineer',
    dates: 'Oct 2025 – Present · Calgary,CA',
    logoImage: LogoNsbe,
    backgroundSize: '100%',
  },
  {
    company: 'KDN+',
    role: 'Software Engineer',
    dates: 'Jul 2024 – Oct 2024 · Remote',
    logoImage: LogoKdn,
    backgroundSize: '90%',
  },
  {
    company: 'GDG On Campus · Babcock',
    role: 'Mobile Application Developer',
    dates: 'Jan 2024 – Jul 2024 · Ogun, NG',
    logoImage: LogoGdg,
    backgroundSize: '90%',
  },
  {
    company: 'UfitFly',
    role: 'Intern',
    dates: 'Jan 2023 – Jul 2023 · Oyo, NG',
    logoImage: LogoUfit,
    backgroundSize: '90%',
  },
]

const techBadges = [
  {
    id: 'react',
    logo: 'https://cdn.simpleicons.org/react/61dafb',
    initial: { left: 10, top: 140, scale: 0.45 },
    final: { left: 12, top: 20, scale: 1 },
  },
  {
    id: 'node',
    logo: 'https://cdn.simpleicons.org/nodedotjs/5fa04e',
    initial: { left: 28, top: 180, scale: 0.4 },
    final: { left: 28, top: 25, scale: 0.95 },
  },
  {
    id: 'python',
    logo: 'https://cdn.simpleicons.org/python/3776AB',
    initial: { left: 44, top: 220, scale: 0.4 },
    final: { left: 45, top: 30, scale: 0.95 },
  },
  {
    id: 'figma',
    logo: 'https://cdn.simpleicons.org/figma/F24E1E',
    initial: { left: 65, top: 225, scale: 0.45 },
    final: { left: 62, top: 28, scale: 1 },
  },
  {
    id: 'openai',
    logo: 'https://cdn.simpleicons.org/openai/412991',
    initial: { left: 82, top: 210, scale: 0.4 },
    final: { left: 78, top: 24, scale: 0.95 },
  },
  {
    id: 'storybook',
    logo: 'https://cdn.simpleicons.org/storybook/FF4785',
    initial: { left: 92, top: 240, scale: 0.4 },
    final: { left: 72, top: 32, scale: 0.95 },
  },
  {
    id: 'git',
    logo: 'https://cdn.simpleicons.org/git/F05033',
    initial: { left: 8, top: 240, scale: 0.4 },
    final: { left: 20, top: 35, scale: 0.95 },
  },
  {
    id: 'github',
    logo: 'https://cdn.simpleicons.org/github/000000',
    initial: { left: 24, top: 250, scale: 0.4 },
    final: { left: 32, top: 40, scale: 0.95 },
  },
  {
    id: 'dart',
    logo: 'https://cdn.simpleicons.org/dart/0175C2',
    initial: { left: 50, top: 260, scale: 0.35 },
    final: { left: 55, top: 45, scale: 0.9 },
  },
  {
    id: 'java',
    logo: 'https://cdn.simpleicons.org/java/EA2D2E',
    initial: { left: 70, top: 265, scale: 0.35 },
    final: { left: 68, top: 50, scale: 0.9 },
  },
  {
    id: 'cpp',
    logo: 'https://cdn.simpleicons.org/cplusplus/00599C',
    initial: { left: 90, top: 270, scale: 0.35 },
    final: { left: 75, top: 55, scale: 0.9 },
  },
  {
    id: 'notion',
    logo: 'https://cdn.simpleicons.org/notion/000000',
    initial: { left: 40, top: 250, scale: 0.35 },
    final: { left: 45, top: 35, scale: 0.9 },
  },
  {
    id: 'databricks',
    logo: 'https://cdn.simpleicons.org/databricks/FF3621',
    initial: { left: 15, top: 260, scale: 0.35 },
    final: { left: 18, top: 45, scale: 0.9 },
  },
  {
    id: 'pyspark',
    logo: 'https://cdn.simpleicons.org/apachespark/E25A1C',
    initial: { left: 32, top: 275, scale: 0.35 },
    final: { left: 35, top: 55, scale: 0.9 },
  },
  {
    id: 'jira',
    logo: 'https://cdn.simpleicons.org/jira/0052CC',
    initial: { left: 52, top: 280, scale: 0.35 },
    final: { left: 52, top: 60, scale: 0.9 },
  },
  {
    id: 'teams',
    logo: 'https://cdn.simpleicons.org/microsoftteams/4643CE',
    initial: { left: 70, top: 275, scale: 0.35 },
    final: { left: 68, top: 65, scale: 0.9 },
  },
  {
    id: 'slack',
    logo: 'https://cdn.simpleicons.org/slack/4A154B',
    initial: { left: 85, top: 260, scale: 0.35 },
    final: { left: 78, top: 70, scale: 0.9 },
  },
  {
    id: 'meet',
    logo: 'https://cdn.simpleicons.org/googlemeet/00897B',
    initial: { left: 5, top: 280, scale: 0.35 },
    final: { left: 25, top: 65, scale: 0.9 },
  },
  {
    id: 'miro',
    logo: 'https://cdn.simpleicons.org/miro/050038',
    initial: { left: 45, top: 290, scale: 0.35 },
    final: { left: 45, top: 70, scale: 0.9 },
  },
  {
    id: 'vscode',
    logo: 'https://cdn.simpleicons.org/visualstudiocode/007ACC',
    initial: { left: 65, top: 295, scale: 0.35 },
    final: { left: 62, top: 75, scale: 0.9 },
  },
  {
    id: 'ml',
    logo: 'https://cdn.simpleicons.org/tensorflow/FF6F00',
    initial: { left: 82, top: 290, scale: 0.35 },
    final: { left: 75, top: 80, scale: 0.9 },
  },
  {
    id: 'sql',
    logo: 'https://cdn.simpleicons.org/mysql/4479A1',
    initial: { left: 25, top: 300, scale: 0.35 },
    final: { left: 30, top: 85, scale: 0.9 },
  },
  {
    id: 'aws',
    logo: 'https://cdn.simpleicons.org/amazonaws/FF9900',
    initial: { left: 55, top: 305, scale: 0.35 },
    final: { left: 60, top: 90, scale: 0.9 },
  },
]

const Home = () => {
  const credlyBadge = 'https://cdn.simpleicons.org/credly/FF6B00'
  const [isReady, setIsReady] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [aboutProgress, setAboutProgress] = useState(0)
  const [portfolioProgress, setPortfolioProgress] = useState(0)
  const [experienceProgress, setExperienceProgress] = useState(0)
  const scrollRef = useRef(null)
  const aboutRef = useRef(null)
  const portfolioRef = useRef(null)
  const experienceRef = useRef(null)

  useEffect(() => {
    const textTimeout = setTimeout(() => setIsReady(true), 60)
    return () => clearTimeout(textTimeout)
  }, [])

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return undefined

    const handleScroll = () => {
      const heroProgress = Math.min(1, Math.max(0, node.scrollTop / node.clientHeight))
      setScrollProgress(heroProgress)

      const updateSectionProgress = (ref, setter, startFactor = 0.8, windowFactor = 0.9) => {
        if (!ref.current) return
        const { offsetTop } = ref.current
        const triggerStart = offsetTop - node.clientHeight * startFactor
        const local = (node.scrollTop - triggerStart) / (node.clientHeight * windowFactor)
        setter(clamp(local))
      }

      updateSectionProgress(aboutRef, setAboutProgress, 0.85, 1)
      updateSectionProgress(portfolioRef, setPortfolioProgress, 0.8, 1.4)
      updateSectionProgress(experienceRef, setExperienceProgress, 0.85, 1.2)
    }

    node.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => node.removeEventListener('scroll', handleScroll)
  }, [])

  const easedHero = Math.max(0, scrollProgress - 0.03)
  const heroStyle = {
    filter: `blur(${Math.min(28, easedHero * 40).toFixed(2)}px)`,
    transform: `scale(${(1 - easedHero * 0.06).toFixed(3)})`,
    opacity: Number((1 - easedHero * 0.5).toFixed(2)),
  }

  const aboutEnter = clamp(aboutProgress * 1)
  const aboutExit = clamp((aboutProgress - 1) * 6)
  const aboutOpacity = aboutEnter * (1 - aboutExit * 0.8)
  const aboutCopyStyle = {
    opacity: aboutOpacity,
    transform: `translate(${(1 - aboutEnter) * -60}px, ${(1 - aboutEnter) * 20}px)`,
    filter: `blur(${aboutExit * 24}px)`,
  }

  const aboutImagesStyle = {
    opacity: aboutOpacity,
    transform: `translate(${(1 - aboutEnter) * 60}px, ${(1 - aboutEnter) * -10}px) scale(${
      1 + (1 - aboutEnter) * 0.06 - aboutExit * 0.05
    })`,
    filter: `blur(${aboutExit * 18}px)`,
  }

  const portfolioIntroStyle = {
    opacity: clamp(portfolioProgress * 1.1),
    transform: `translate(${(1 - portfolioProgress) * -50}px, ${(1 - portfolioProgress) * 40}px)`,
  }

  return (
    <main className={`home-page ${isReady ? 'is-ready' : ''}`}>
      <div className='home-scroll' ref={scrollRef}>
        <section className='home-section home-section--hero'>
          <div className='home-stage' style={heroStyle}>
            <div className='mood-hero'>
              <span className='mood-script'>Alli</span>
              <h1 className='mood-title'>
                <span className='word'>SODEEQ</span> <span className='word'>AYOBAMI</span>
              </h1>
            </div>
            <div className='scroll-hint'>
              <span>Scroll to explore</span>
              <span aria-hidden='true'>↓</span>
            </div>
            <div className='mood-footer'>
              <p className='mood-note'>SOFTWARE ENGINEER</p>
              <a className='mood-note mood-contact' href='mailto:sodeeqalli@gmail.com'>
                Contact me
              </a>
            </div>
          </div>
        </section>

        <section className='home-section home-section--about' ref={aboutRef}>
          <div className='about-stage'>
            <div className='about-images' style={aboutImagesStyle}>
              <figure className='about-shot about-shot--primary'>
                <img src={PortraitOne} alt='Portrait of Sodeeq in purple tones' loading='lazy' />
              </figure>
              <figure className='about-shot about-shot--secondary'>
                <img src={PortraitTwo} alt='Portrait of Sodeeq in yellow tones' loading='lazy' />
              </figure>
              <figure className='about-shot about-shot--tertiary'>
                <img src={PortraitThree} alt='Portrait of Sodeeq close-up' loading='lazy' />
              </figure>
            </div>
            <div className='about-details' style={aboutCopyStyle}>
              <p className='about-line'>21.</p>
              <p className='about-line'>LOCATED CALGARY, AB.</p>
              <p className='about-line'>MENG @ UNIVERSITY OF CALGARY.</p>
              <p className='about-line'>LOVE FOOTBALL MORE THAN WORDS CAN EXPRESS.</p>
              <p className='about-line'>I ALSO LOVE TEACHING.</p>
              <p className='about-line'>I PLAY TABLE-TENNIS.</p>
              <p className='about-line'>PYTHON, AWS, JS.</p>
              <div className='about-socials'>
                <a href='https://x.com/allisodeeq_' target='_blank' rel='noreferrer' aria-label='Twitter'>
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <a href='https://www.instagram.com/sodeeq.alli/' target='_blank' rel='noreferrer' aria-label='Instagram'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href='https://discordapp.com/users/sodeeqalli' target='_blank' rel='noreferrer' aria-label='Discord'>
                  <FontAwesomeIcon icon={faDiscord} />
                </a>
                <a href='https://www.linkedin.com/in/sodeeq-alli-94071b267/' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href='https://www.credly.com/users/sodeeq-alli' target='_blank' rel='noreferrer' aria-label='Credly'>
                  <img src={credlyBadge} alt='Credly badge' />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='home-section home-section--portfolio' ref={portfolioRef}>
          <div className='portfolio-stage'>
            <div className='portfolio-tech-canvas'>
              {techBadges.map(badge => {
                const progress = clamp(portfolioProgress * 1.2)
                const left = lerp(badge.initial.left, badge.final.left, progress)
                const top = lerp(badge.initial.top, badge.final.top, progress)
                const scale = lerp(badge.initial.scale, badge.final.scale, progress)
                return (
                  <span
                    key={badge.id}
                    className='tech-badge'
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      opacity: progress,
                      backgroundImage: `url(${badge.logo})`,
                    }}
                  />
                )
              })}
            </div>
            <div className='services-stack' style={portfolioIntroStyle}>
              <span className='kicker'>Skills</span>
              <div className='services-list'>
                {services.map((service, index) => {
                  const serviceProgress = clamp(portfolioProgress * 1.2 - index * 0.05)
                  const direction = index % 2 === 0 ? -1 : 1
                  return (
                    <span
                      key={service}
                      style={{
                        opacity: clamp(serviceProgress),
                        transform: `translateX(${(1 - clamp(serviceProgress)) * 80 * direction}px)`,
                      }}
                    >
                      {service}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className='home-section home-section--experience' ref={experienceRef}>
          <div className='experience-stage'>
            <div
              className='experience-header'
              style={{
                opacity: clamp(experienceProgress * 1.1),
                transform: `translateY(${(1 - experienceProgress) * 60}px)`,
              }}
            >
              <h2>EXPERIENCE.</h2>
            </div>
            <div className='experience-gallery-wrapper'>
              <span className='experience-scroll-hint'>Scroll →</span>
              <div
                className='experience-gallery'
                style={{
                  opacity: clamp(experienceProgress * 1.15),
                  transform: `translateX(${(1 - experienceProgress) * 60}px)`,
                }}
              >
                {experiences.map((exp, index) => {
                  const cardProgress = clamp(experienceProgress * 1.3 - index * 0.05)
                  return (
                    <article
                      className='experience-gallery-card'
                      key={exp.company}
                      style={{
                        opacity: cardProgress,
                        transform: `translateY(${(1 - cardProgress) * 30}px)`,
                        backgroundImage: `url(${exp.logoImage})`,
                        backgroundSize: exp.backgroundSize ?? 'cover',
                      }}
                    >
                      <div className='experience-overlay'>
                        <span className='experience-company'>{exp.company}</span>
                        <p className='experience-role'>{exp.role}</p>
                        <p className='experience-dates'>{exp.dates}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
