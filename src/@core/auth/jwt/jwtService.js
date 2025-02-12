import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
export const baseAPI_URL = globalThis.baseAPI_URL;
export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // axios.defaults.baseURL = 'https://esign.digitalsignature.com.bd:8989/ecuser-1.0'
    // axios.defaults.baseURL = 'https://fvs.middleware.southeastbank.com.bd:8443/ecuser-1.0'
    axios.defaults.baseURL = baseAPI_URL
    // axios.defaults.baseURL = 'https://fvs.southeastbank.com.bd/apiserver'

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = (this.getToken() || '').replace(/['"]+/g, '')
        config.headers['Accept'] = 'application/json'

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }

        return config
      },
      error => Promise.reject(error)
    )

    // // ** Request Interceptor
    // axios.interceptors.request.use(
    //   config => {
    //     // ** Get token from localStorage
    //     const accessToken = this.getToken()

    //     // ** If token is present add it to request's Authorization Header
    //     if (accessToken) {
    //       // ** eslint-disable-next-line no-param-reassign
    //       config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //     }
    //     return config
    //   },
    //   error => Promise.reject(error)
    // )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // ** if (status === 401) {
        if (response && response.status === 401) {
          console.log("originalRequest 1", originalRequest)
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false
              console.log("originalRequest 2", originalRequest)
              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            console.log("originalRequest 3", originalRequest)
            window.location.href = "/login"
            localStorage.removeItem('userData')
            localStorage.removeItem('individual')
            localStorage.removeItem('company')
            localStorage.removeItem('type')
            this.addSubscriber(accessToken => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axios(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
