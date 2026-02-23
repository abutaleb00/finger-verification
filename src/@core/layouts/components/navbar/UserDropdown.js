// ** React Imports
import { Link, useNavigate } from 'react-router-dom' // Added useNavigate here
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/profilepic.png'

import useJwt from '@src/auth/jwt/useJwt'
import toast from 'react-hot-toast'
import axios from 'axios'

const config = useJwt.jwtConfig

const UserDropdown = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate() // Initialize navigate here

  // ** State
  const [userData, setUserData] = useState(null)

  // Helper to clear local storage and redirect
  const clearSessionAndRedirect = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('individual')
    localStorage.removeItem('company')
    localStorage.removeItem('type')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
    dispatch(handleLogout()) // Also update Redux state
    navigate('/login')
  }

  const logoutapicall = () => {
    axios.delete('/oauth/revoke')
      .then(res => {
        if (res.data.result.error === false) {
          clearSessionAndRedirect()
        } else {
          toast.error(res.data.result.errorMsg || 'Logout failed')
          clearSessionAndRedirect()
        }
      })
      .catch(err => {
        console.error(err)
        clearSessionAndRedirect()
      })
  }

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>
            {userData ? `${userData['fullName']}, ${userData['branchName']} (${userData['roleName']})` : 'User'}
          </span>
        </div>
        <Avatar img={userAvatar} style={{ background: "white" }} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/user/change-password'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>Change Password</span>
        </DropdownItem>
        <DropdownItem divider />
        {/* Changed tag to 'div' to prevent Link conflicts with onClick redirect */}
        <DropdownItem tag='div' className='cursor-pointer' onClick={() => logoutapicall()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown