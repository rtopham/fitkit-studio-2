import { signout } from './api-auth.js'
import jsonwebtoken from 'jsonwebtoken'

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
        let subscriptionStatus=jsonwebtoken.decode(jwt.token).subscription_status
        let today= Date.now()
        let expDate = new Date(subscriptionStatus.expiration)
        if(subscriptionStatus.service_level==='Quick Size'||today>expDate) return false
        else  return true

      } else
      return false
   
  },

isAuthenticatedAndAdmin(){
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt')){
    let jwt = JSON.parse(sessionStorage.getItem('jwt'))
    let adminStatus=jsonwebtoken.decode(jwt.token).admin
    if(!adminStatus) return false
    else  return true
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
