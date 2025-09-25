import './index.scss'
import TopNav from '../TopNav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='App'>
      <TopNav />
      <div className='page'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
