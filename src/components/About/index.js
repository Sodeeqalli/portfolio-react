import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAws } from '@fortawesome/free-brands-svg-icons'


const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const tools = [
    { name: 'AWS', icon: faAws , level: 80},
    // Add more tools and their corresponding FontAwesome icons here
  ]

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setLetterClass('text-animate-hover'),
      4000
    )
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="container about-page">
      <div className="text-zone">
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['A', 'b', 'o', 'u', 't', ' ', 'M', 'e']}
            idx={15}
          />
        </h1>
        <p>
          I am a dedicated and results-driven Software and Cloud Engineer with a
          strong foundation in computer science and a passion for developing
          innovative solutions. With expertise in Python, JavaScript, and AWS, I
          design, implement, and maintain scalable applications and cloud
          infrastructure.
        </p>
        <p>
          My experience spans full‑stack development, cloud architecture, and
          DevOps practices. I thrive in collaborative teams and enjoy moving
          projects from concept to deployment with a focus on reliability and
          performance.
        </p>
        <p>
          I’m committed to continuous learning and staying current with modern
          tooling and patterns. My goal is to build impactful software that
          aligns with business needs and delivers great user experiences.
        </p>
        <h2><AnimatedLetters letterClass={letterClass} strArray={[...'Languages, Frameworks & Tools']} idx={1} /></h2>
        <div className='tool-skills'>
          {tools.map(t => (
            <div className='skill-row' key={t.name} role= "group" aria-label={t.name}>
              <div className='skill-icon' title='{t.name}'><FontAwesomeIcon icon={t.icon}/>
              </div> <div className='skill-bar' role='progressbar' aria-valuemin="0" aria-valuemax="100" aria-valuenow={t.level}> <div className='skill-fill' style={{width: t.level + '%'}}/></div><div className='skill-percent'>{t.level}%</div></div>))} </div>
        </div>
      </div>
    
  )
}

export default About
