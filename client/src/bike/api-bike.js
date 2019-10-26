const create = (params, credentials, bike) => {
    return fetch('/api/bikes/new/'+params.userId+'/'+params.cyclistId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bike)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const listAllBikes = (credentials) => {
    return fetch('/api/bikes/', {
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


  const listByUser = (params, credentials) => {
 //     console.log(params)
      return fetch('/api/bikes/by/'+ params.userId, {
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

    const listByCyclist = (params, credentials) => {
      //     console.log(params)
           return fetch('/api/bikes/by/'+ params.cyclistId, {
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

  const read = (params, credentials) => {
    return fetch('/api/bikes/'+params.userId+'/' + params.bikeId, {
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
  
  const update = (params, credentials, bike) => {
    return fetch('/api/bikes/'+params.userId+'/'+ params.cyclistId+'/'+ params.bikeId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(bike)
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const remove = (params, credentials) => {
    return fetch('/api/bikes/'+params.userId+'/'+params.cyclistId+'/'+ params.bikeId, {
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
  
  export {
    listByUser,
    listByCyclist,
    create,
    listAllBikes,
    read,
    update,
    remove
  }
  