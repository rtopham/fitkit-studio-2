import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  isAuthenticatedAndPaid(){
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt')){
    let jwt = JSON.parse(sessionStorage.getItem('jwt'))
    let today= Date.now()
    let expDate = new Date(jwt.user.subscription_status.expiration)
    if(jwt.user.subscription_status.service_level==='Quick Size'||today>expDate) return false
    else  return JSON.parse(sessionStorage.getItem('jwt'))
    } else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  signout(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
