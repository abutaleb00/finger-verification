// ** React Imports
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
import jwtDefaultConfig from '../../../@core/auth/jwt/jwtDefaultConfig'
export const baseAPI_URL = globalThis.baseAPI_URL;
export const baseURL = globalThis.baseURL;
export const ADcallBack = globalThis.ADcallBack;
export const bankLogin = globalThis.bankLogin;
export const security_key = globalThis.security_key;

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
} from 'reactstrap'
// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'
import logo from '@src/assets/images/logo/logo.svg'
import { isUserLoggedIn } from '@utils'
// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {

  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

// const defaultValues = {
//   password: "123",
//   loginEmail: "john_doe5",
// }
const defaultValues = {
  password: "",
  loginEmail: "",
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
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
  }, [])

  const getLogEnduser = (res) => {
    console.log("res", res)
    console.log("res.data?.access_token", res.data?.access_token)
    const accessToken = res.data?.access_token
    const refreshToken = res.data?.refresh_token
     var myHeaders = new Headers();
 myHeaders.append("Authorization", `Bearer ${accessToken}`);
 
 
 var requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
 };
 fetch(`${baseAPI_URL}/getloogedinuser`, requestOptions)
   .then(response => response.json())
   .then(result => {
    if(result.result.error === false){
      const mapdata = result?.data !== undefined && result?.data?.pages?.map((v) =>{
        return v?.permissions?.map((k,i) =>{
          return ({action: k , subject: v.name})
        })
      })
      const abilityfor = mapdata.flat(1)
      const role1 = 'admin'
      const data = { ...result.data, accessToken: accessToken, refreshToken: refreshToken, ability: abilityfor, role: result?.roleName }
      dispatch(handleLogin(data))
      ability.update(abilityfor)
        navigate(getHomeRouteForLoggedInUser(data.roleName))
        toast(t => (
          <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
        ))
    } else if(result.result.error === true){
      toast.error(result.result.errorMsg)
    }
   })
   .catch(error => console.log('error', error)); 
  }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0");
      var urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "password");
      urlencoded.append("username", data.loginEmail);
      urlencoded.append("password", data.password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
    fetch(`${baseAPI_URL}/oauth/token`, requestOptions)
      .then(response =>response.json())
  .then(function (res) {
    const data1 = JSON.stringify(res)
    console.log("first", JSON.stringify(res))
    if(res.result.error === false){
      getLogEnduser(res)
    } else if(res.result.error === true){
      toast.error(res.result.errorMsg)
    }
    console.log("res", JSON.stringify(res))

  })
  .catch(error => console.log('error', error));
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }
 
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
        <img style={{width:"25px", height:"auto"}} src={logo} alt='Login Cover' />
        {/* <img style={{width:"25px", height:"auto"}} src={logo2} alt='Login Cover' /> */}
          <h2 className='brand-text text-primary ms-1'>Fingerprint Verification Solution (Commlink Into Tech Ltd.)</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Fingerprint Verification Solution
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Username
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Login
              </Button>
              {/* <p style={{textAlign:"center", marginBottom:"0px", marginTop:"10px"}}>or</p>
              <a  href={`${bankLogin}?j_security_key=${security_key}`}>
              <Button type='button' color='success' style={{marginTop:"10px"}} block>
                Sign in with Bank ID
              </Button>
              </a> */}
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
