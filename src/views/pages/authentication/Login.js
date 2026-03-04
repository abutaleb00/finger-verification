// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X, Shield, Globe, ArrowRight, AlertCircle } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser, isUserLoggedIn } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/bg2.jpg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'
import logo from '@src/assets/images/logo/logo.png'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** Constants
export const baseAPI_URL = 'https://sebfvs.southeastbank.com.bd/apiserver'

const ToastContent = ({ t, name, role }) => (
  <div className='d-flex'>
    <div className='me-1'>
      <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
    </div>
    <div className='d-flex flex-column'>
      <div className='d-flex justify-content-between'>
        <h6>{name}</h6>
        <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
      </div>
      <span>Successfully logged in as {role}.</span>
    </div>
  </div>
)

const defaultValues = {
  password: "",
  loginEmail: ""
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)

  // ** States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorModal, setErrorModal] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      navigate('/dashboard')
    }
  }, [navigate])

  const toggleModal = () => setErrorModal(!errorModal)

  const getLogEnduser = (res) => {
    const accessToken = res.data?.access_token
    const refreshToken = res.data?.refresh_token

    if (!accessToken) {
      toast.error("Authentication token not found.")
      setIsSubmitting(false)
      return
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }

    fetch(`${baseAPI_URL}/getloogedinuser`, requestOptions)
      .then(response => {
        if (!response.ok) throw new Error('User profile fetch failed')
        return response.json()
      })
      .then(result => {
        if (result.result?.error === false) {
          const mapdata = result?.data?.pages?.map((v) => {
            return v?.permissions?.map((k) => ({ action: k, subject: v.name }))
          }) || []

          const abilityfor = mapdata.flat(1)
          const userData = {
            ...result.data,
            accessToken,
            refreshToken,
            ability: abilityfor,
            role: result?.roleName
          }

          dispatch(handleLogin(userData))
          ability.update(abilityfor)
          navigate(getHomeRouteForLoggedInUser(userData.roleName || 'admin'))
          toast(t => <ToastContent t={t} role={userData.role || 'User'} name={userData.fullName || userData.username || 'User'} />)
        } else {
          toast.error(result.result?.errorMsg || "Failed to load user data")
        }
      })
      .catch(error => {
        console.error('Profile Error:', error)
        toggleModal() // Show modal on network failure
      })
      .finally(() => setIsSubmitting(false))
  }

  const onSubmit = data => {
    setIsSubmitting(true)

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
    myHeaders.append("Authorization", "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0")

    const urlencoded = new URLSearchParams()
    urlencoded.append("grant_type", "password")
    urlencoded.append("username", data.loginEmail)
    urlencoded.append("password", data.password)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      mode: 'cors'
    }

    fetch(`${baseAPI_URL}/oauth/token`, requestOptions)
      .then(response => {
        if (!response.ok && response.status !== 400) {
          throw new Error('Server connection error')
        }
        return response.json()
      })
      .then(res => {
        if (res.result?.error === false && res.data?.access_token) {
          getLogEnduser(res)
        } else {
          setIsSubmitting(false)
          toast.error(res.result?.errorMsg || res.error_description || "Invalid Username or Password")
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        console.error('Fetch Error:', error)
        toggleModal() // Trigger the Diagnostic Modal
      })
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img style={{ width: "25px", height: "auto" }} src={logo} alt='logo' />
          <h2 className='brand-text text-primary ms-1'>Fingerprint Verification Solution</h2>
        </Link>

        <Col className='d-none d-lg-flex align-items-center p-3 mt-3' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center pr-5'>
            <img className='img-fluid' style={{ maxHeight: "400px" }} src={source} alt='Login Cover' />
          </div>
        </Col>

        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>Welcome to SEBPLC</CardTitle>
            <CardText className='mb-2'>Please sign-in to your account</CardText>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='loginEmail'>Username</Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  rules={{ required: 'Username is required' }}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='Username'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
              </div>

              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='password'>Password</Label>
                  <Link to='/forgot-password'><small>Forgot Password?</small></Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </div>

              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>Remember Me</Label>
              </div>

              <Button type='submit' color='primary' block disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>

      {/* Connection Diagnostic Modal */}
      <Modal
        isOpen={errorModal}
        toggle={toggleModal}
        className='modal-dialog-centered'
        contentClassName='border-0 shadow-lg'
        size='md'
      >
        <ModalBody className='p-0 overflow-hidden' style={{ borderRadius: '16px' }}>
          {/* Header Section */}
          <div className='text-center p-4' style={{ backgroundColor: '#fff' }}>
            <div className='mb-3 d-inline-flex align-items-center justify-content-center'
              style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#fee2e2' }}>
              <Shield size={36} className='text-danger' />
            </div>
            <h3 className='fw-bolder text-dark mb-1' style={{ fontSize: '2.5rem' }}>Connection Failed</h3>
            <h5 className='text-muted' style={{ fontSize: '1.5rem' }}>
              The API server could not be reached.
            </h5>
            {/* Minimalist Top Close */}
            <button
              className='position-absolute border-0 bg-transparent'
              style={{ top: '24px', right: '24px' }}
              onClick={toggleModal}
            >
              <X size={24} className='text-muted' />
            </button>
          </div>

          <div className='px-4 pb-4'>
            {/* High-Readability Instruction Box */}
            <div className='rounded-3 p-3 mb-2' style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca' }}>
              <div className='d-flex align-items-center mb-2'>
                <AlertCircle size={20} className='text-danger me-1' />
                <span className='fw-bold text-dark' style={{ fontSize: '1.5rem' }}>How to fix:</span>
              </div>

              <div className='d-flex flex-column gap-1'>
                <div className='d-flex align-items-center'>
                  <span className='badge rounded-circle bg-white text-danger border me-2' style={{ width: '28px', height: '28px', lineHeight: '20px', fontSize: '1rem' }}>1</span>
                  <span style={{ fontSize: '1.05rem', color: '#374151' }}>Click <strong>Authorize Connection</strong></span>
                </div>
                <div className='d-flex align-items-center'>
                  <span className='badge rounded-circle bg-white text-danger border me-2' style={{ width: '28px', height: '28px', lineHeight: '20px', fontSize: '1rem' }}>2</span>
                  <span style={{ fontSize: '1.05rem', color: '#374151' }}>Sign in to access this site <strong>then</strong> press <strong>"Cancel"</strong></span>
                </div>
                <div className='d-flex align-items-center'>
                  <span className='badge rounded-circle bg-white text-danger border me-2' style={{ width: '28px', height: '28px', lineHeight: '20px', fontSize: '1rem' }}>3</span>
                  <span style={{ fontSize: '1.05rem', color: '#374151' }}>Return here and log in again</span>
                </div>
              </div>
            </div>

            {/* Aligned Action Buttons */}
            <div className='d-flex gap-2'>
              <Button
                color='primary'
                href={baseAPI_URL+'/oauth/token'}
                target='_blank'
                rel='noreferrer'
                className='flex-grow-1 py-2 fw-bold d-flex align-items-center justify-content-center'
                style={{ borderRadius: '10px', fontSize: '1rem' }}
                onClick={toggleModal}
              >
                <Globe size={18} className='me-1' />
                Authorize Connection
              </Button>

              <Button
                color='secondary'
                outline
                className='py-2 fw-bold'
                style={{ borderRadius: '10px', fontSize: '1rem', minWidth: '100px' }}
                onClick={toggleModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Login