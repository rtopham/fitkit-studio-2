import { signout } from './api-auth.js'
import crypto from 'crypto'
import clientConfig from './../clientconfig/config'

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
        if (sessionStorage.getItem('fks')){
        let fks = JSON.parse(sessionStorage.getItem('fks'))
        
        let valid = crypto
        .createHmac('sha1', clientConfig.fksHashSecret)
        .update('valid')
        .digest('hex')

       if(fks.qsp.status===valid){
         
        return true
       } 
          else  return false
  
        } else
        return false
     
    },


isAuthenticatedAndAdmin(){

    if (typeof window == "undefined")
      return false
      if (sessionStorage.getItem('fks')){
      let fks = JSON.parse(sessionStorage.getItem('fks'))

      let admin = crypto
      .createHmac('sha1', clientConfig.fksHashSecret)
      .update(true)
      .digest('hex')

     if(fks.admin===admin){
       
      return true
     } 
        else  return false

      } else
      return false
   
  },

  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      jwt.user.admin=undefined
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },

  storeFKSObject(subObject,admin){

    let hash= crypto
    .createHmac('sha1', clientConfig.fksHashSecret)
    .update(subObject.qsp.status)
    .digest('hex')
    subObject.qsp={status:hash}
    if(admin){
    let adminHash= crypto
    .createHmac('sha1', clientConfig.fksHashSecret)
    .update(admin)
    .digest('hex')    
    subObject.admin=adminHash
    }
    if (typeof window !== "undefined")
    sessionStorage.setItem('fks', JSON.stringify(subObject))
  },



  signout(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
      sessionStorage.removeItem('fks')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
