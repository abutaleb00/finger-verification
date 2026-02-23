import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

// Fallback or Environment Variable is safer than globalThis
export const baseAPI_URL = 'https://sebfvs.southeastbank.com.bd/apiserver';
// export const baseAPI_URL = globalThis.baseAPI_URL || 'https://sebfvs.southeastbank.com.bd/apiserver';

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }
  isAlreadyFetchingAccessToken = false
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Initialize Axios instance settings
    axios.defaults.baseURL = baseAPI_URL
    axios.defaults.headers.common['Accept'] = 'application/json'

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        const token = this.getToken()
        const accessToken = token ? token.replace(/['"]+/g, '') : null

        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // ** Response Interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        const { config, response } = error;

        // 1. HANDLE DNS/NETWORK ERRORS (The issue in your screenshot)
        if (!error.response) {
          console.error("Network Error or DNS Resolution Failed. Check VPN/Connection.");
          // You could trigger a global notification here
          return Promise.reject(error);
        }

        // 2. HANDLE AUTHENTICATION ERRORS
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true

            this.refreshToken()
              .then(r => {
                this.isAlreadyFetchingAccessToken = false
                this.setToken(r.data.accessToken)
                this.setRefreshToken(r.data.refreshToken)
                this.onAccessTokenFetched(r.data.accessToken)
              })
              .catch(() => {
                // If refresh fails, clear everything and go to login
                this.logoutUser();
              })
          }

          // Retry logic for other requests waiting for the new token
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(axios(config))
            })
          })
          return retryOriginalRequest
        }

        return Promise.reject(error)
      }
    )
  }

  // Helper to clear session
  logoutUser() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)
    localStorage.removeItem('userData')
    // Redirect only if not already on login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = "/login"
    }
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() { return localStorage.getItem(this.jwtConfig.storageTokenKeyName) }
  getRefreshToken() { return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName) }
  setToken(value) { localStorage.setItem(this.jwtConfig.storageTokenKeyName, value) }
  setRefreshToken(value) { localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value) }

  login(...args) { return axios.post(this.jwtConfig.loginEndpoint, ...args) }
  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}