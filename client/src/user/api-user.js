const create = (user) => {
    return fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const list = () => {
    return fetch('/api/users/', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }

  const listAllUsers = (params, credentials) => {
    return fetch('/api/users/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
       }      
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  } 

  const readUserName= (params, credentials) =>{
    return fetch('/api/username/' + params.userId, {
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

  const read = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {
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
  
  const update = (params, credentials, user) => {
    return fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }

 
  const remove = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {
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

    return fetch('/api/stripe/create-customer/' + params.userId, {
        method: 'POST',
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
    create,
    list,
    listAllUsers,
    read,
    readUserName,
    update,
    remove,
    charge,
    createStripeCustomer,
    createStripeSubscription,
    readStripeSubscription,
    updateStripeSubscription
  }
  