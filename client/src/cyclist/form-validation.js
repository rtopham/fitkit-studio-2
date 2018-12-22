
const validateInputLength=(input, min)=>{
    const length = input.length
      if(length>min) return 'success';
      else if (length>0) return 'error';
      return null;
   }
  
const validateBirthDate=(date)=>{
    const regex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/ 
    if(regex.test(date)) return 'success'; else if (date.length>0) return 'error'
   }
  
const validateTime=(time)=>{
    const regex = /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/
    if(regex.test(time)) return 'success'; else if (time.length>0) return 'error'
   }
   
const validateEmail=(email)=>{
    const regex =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g 
    if(regex.test(email)) return 'success'; else if (email.length>0) return 'error'
   } 

const validatePhone=(phone)=>{
    const regex =  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm 
    if(regex.test(phone)) return 'success'; else if (phone.length>0) return 'error'
   } 

const validateZipCode=(zipCode)=>{
    const regex =  /(^\d{5}(\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$)(^\d{5}(\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$)/g 
    if(regex.test(zipCode)) return 'success'; else if (zipCode.length>0) return 'error'
   }

export {
    validateInputLength,
    validateBirthDate,
    validateTime,
    validateEmail,
    validatePhone,
    validateZipCode
}