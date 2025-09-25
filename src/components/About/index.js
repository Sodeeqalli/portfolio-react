import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAws,
  faPython,
  faJs,
  faNodeJs,
  faReact,
  faGitAlt,
  faGithub,
  faJava,
  faCuttlefish,
} from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'


const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const tools = [
    { name: 'AWS', icon: faAws, level: 80 },
    { name: 'Python', icon: faPython, level: 80 },
    { name: 'GitHub', icon: faGithub, level: 80 },
    { name: 'Git', icon: faGitAlt, level: 80 },
    { name: 'JavaScript', icon: faJs, level: 70 },
    { name: 'Node.js', icon: faNodeJs, level: 70 },
    { name: 'React', icon: faReact, level: 70 },
    { name: 'Dart', icon: faCode, level: 70 }, 
    { name: 'Java', icon: faJava, level: 40 },
    { name: 'C++', icon: faCuttlefish, level: 40 },
    
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
        <div className='tool-skills' role='list'>
          {tools.map(tool => (
            <div
              className='skill-row'
              key={tool.name}
              role='listitem'
              aria-label={`${tool.name} proficiency ${tool.level} percent`}
            >
              <div className='skill-icon' title={tool.name}>
                <FontAwesomeIcon icon={tool.icon} />
              </div>
              <div className='skill-center'>
                <div
                  className='skill-bar'
                  role='progressbar'
                  aria-valuemin='0'
                  aria-valuemax='100'
                  aria-valuenow={tool.level}
                  aria-label={`${tool.name} proficiency`}
                >
                  <div className='skill-fill' style={{ width: `${tool.level}%` }} />
                </div>
                <div className='skill-name' aria-hidden='true'>
                  {tool.name}
                </div>
              </div>
              <div className='skill-percent'>{tool.level}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
