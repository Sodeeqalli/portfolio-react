import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faBell, faTerminal } from '@fortawesome/free-solid-svg-icons'
import ProfileLogo from '../../assets/images/IMG_9304-removebg-preview.png'

const TopNav = () => (
  <header className='top-nav'>
    <div className='top-nav__brand'>
      <Link to='/' className='top-nav__logo'>
        <img src={ProfileLogo} alt='AS console logo' />
      </Link>
      <div className='top-nav__search'>
        <button className='top-nav__search-toggle' type='button'>
          <span className='top-nav__search-icon'>⌕</span>
          <span>Tap to Search</span>
          <span className='top-nav__search-shortcut'>[Option+S]</span>
        </button>
        <div className='top-nav__search-menu'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/portfolio'>Portfolio</NavLink>
          <NavLink to='/work'>Experience</NavLink>
          <NavLink to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>

    <div className='top-nav__actions'>
      <span className='top-nav__divider'>|</span>
      <button className='top-nav__action' type='button' title='Toggle theme'>
        <FontAwesomeIcon icon={faGear} />
      </button>
      <span className='top-nav__divider'>|</span>
      <button className='top-nav__action' type='button' title='Subscribe for updates'>
        <FontAwesomeIcon icon={faBell} />
      </button>
      <span className='top-nav__divider'>|</span>
      <button className='top-nav__action' type='button' title='Launch AI assistant'>
        <FontAwesomeIcon icon={faTerminal} />
      </button>
      <span className='top-nav__divider'>|</span>
      <div className='top-nav__region'>
        <button className='region-toggle' type='button'>us-east-1</button>
        <div className='region-menu'>
          <button type='button'>us-east-1 (N. Virginia)</button>
          <button type='button'>us-west-2 (Oregon)</button>
          <button type='button'>eu-central-1 (Frankfurt)</button>
          <button type='button'>ap-southeast-1 (Singapore)</button>
        </div>
      </div>
      <button className='top-nav__badge'>Console V2</button>
      <span className='top-nav__profile-text'>Sodeeq</span>
    </div>
  </header>
)

export default TopNav
