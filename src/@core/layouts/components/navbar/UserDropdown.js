// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/profilepic.png'

import useJwt from '@src/auth/jwt/useJwt'
import toast from 'react-hot-toast'
import axios from 'axios'

const config = useJwt.jwtConfig

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  const logoutapicall = () => {
    localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)   
    axios.delete('/oauth/revoke').then(res => {
      if(res.data.result.error === false){
        localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
        navigate('/login')
        
      } else if(res.data.result.error === true){
        setBlock(false)
        toast.error(res.data.result.errorMsg)
        localStorage.removeItem('userData')
        localStorage.removeItem(config.storageTokenKeyName)
        localStorage.removeItem(config.storageRefreshTokenKeyName)
        navigate('/login')
      }
     })
     .catch(err => {
      localStorage.removeItem('userData')
        // toast.error(err.data.result.errorMsg)
     })

  }
  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])
  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['fullName']) || 'John Doe'}</span>
          <span className='user-status'>{(userData && userData['roleName']) || 'Admin'}</span>
        </div>
        <Avatar img={userAvatar} style={{background:"white"}} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem> */}
        {/* <DropdownItem divider /> */}
        {/* <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to='/login' onClick={() => logoutapicall()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
