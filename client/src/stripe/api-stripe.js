const charge= (params, credentials, stripeToken) =>{

  return fetch('/api/stripe/charge/' + params.userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + credentials.t
       },
       body: stripeToken.id
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))

  }

const createStripeCustomer = (params, credentials, stripeToken) =>{

    return fetch('/api/stripe/customers/' + params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer ' + credentials.t
         },
         body: stripeToken.id
      }).then((response) => {
//        console.log(response)
           return response.json()
              
      }).catch((err) => console.log(err))
  
    }

const updateStripeCustomer = (params, credentials, stripeToken) =>{

      return fetch('/api/stripe/customers/' + params.userId, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + credentials.t
           },
           body: stripeToken.id
        }).then((response) => {
          return response.json()
        }).catch((err) => console.log(err))
    
      }

const readStripeCustomer = (params, credentials) => {
      return fetch('/api/stripe/customers/' + params.userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      }).then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
    }

const deleteStripeCustomer = (params, credentials) => {
      return fetch('/api/stripe/customers/' + params.userId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      }).then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
    }

const createStripeSubscription = (params, credentials, plan) =>{

      return fetch('/api/stripe/create-subscription/' + params.userId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + credentials.t
           },
           body: plan
        }).then((response) => {
          return response.json()
        }).catch((err) => console.log(err))
    
      }
const readStripeSubscription = (params, credentials) => {
    return fetch('/api/stripe/subscriptions/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }

const updateStripeSubscription = (params, credentials, plan) => {
    return fetch('/api/stripe/subscriptions/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + credentials.t
      },
      body:plan
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }

  
  export {
    charge,
    createStripeCustomer,
    updateStripeCustomer,
    readStripeCustomer,
    deleteStripeCustomer,
    createStripeSubscription,
    readStripeSubscription,
    updateStripeSubscription
  }
  