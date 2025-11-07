import './index.scss'
import { NavLink } from 'react-router-dom'
const links = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'PORTFOLIO', to: '/portfolio' },
  { label: 'EXPERIENCE', to: '/work' },
]

const TopNav = () => (
  <header className='top-nav'>
    <nav className='top-nav__links'>
      {links.map(link => (
        <NavLink key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  </header>
)

export default TopNav
