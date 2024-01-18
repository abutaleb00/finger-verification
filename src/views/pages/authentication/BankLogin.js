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
// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// export const baseAPI_URL = globalThis.baseAPI_URL;
export const baseURL = globalThis.baseURL;
export const ADcallBack = globalThis.ADcallBack;
export const bankLogin = globalThis.bankLogin;
export const security_key = globalThis.security_key;

// ** Reactstrap Imports
import {
  Row,
  Col,
} from 'reactstrap'
// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
const baseAPI_URL = 'https://sebfvs.southeastbank.com.bd/apiserver'
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

const BankLogin = (props) => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const source = skin === 'dark' ? illustrationsDark : illustrationsLight
  useEffect(()=>{
    console.log("baseAPI_URL", baseAPI_URL)
    const userId = new URLSearchParams(globalThis?.location?.search).get("userId");
    const bankultimus = new URLSearchParams(globalThis?.location?.search).get("bankultimus");
    // console.log("id", userId);
    // console.log("bankultimus", bankultimus);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("username", userId);
        urlencoded.append("password", userId);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
  
  fetch(`${baseAPI_URL}/oauth/token`, requestOptions)
    .then(response =>response.json())
    .then(function (res) {
      const accessToken = res.data?.access_token
     const refreshToken = res.data?.refresh_token
    var myHeaders = new Headers();
     myHeaders.append("Authorization", `Bearer ${res.data?.access_token}`);
  
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  if(res?.result.error === false){
  fetch(`${baseAPI_URL}/getloogedinuser`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result?.result.error === false){
      const mapdata = result.data !== undefined && result.data?.pages?.map((v) =>{
        return v?.permissions?.map((k,i) =>{
          return ({action: k , subject: v.name})
        })
      })
      const abilityfor = mapdata.flat(1)
      const data = { ...result.data, accessToken: accessToken, refreshToken: refreshToken, ability: abilityfor, role: result?.roleName }
      dispatch(handleLogin(data))
      ability.update(abilityfor)
        navigate(getHomeRouteForLoggedInUser(data.roleName))
        toast(t => (
          <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
        ))
      } else if(result?.result.error === true){
        toast.error(result.result.errorMsg)
      }
    })
    .catch(error => console.log('error', error));
  } else if(res?.result.error === true){
    toast.error(res.result.errorMsg)
  }
    })
    .catch(error => console.log('error', error));

},[])

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <h2 className='brand-text text-primary ms-1'>Fingerprint Verification Solution</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='12' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BankLogin