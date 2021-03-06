const create = (params, credentials, cyclist) => {
    return fetch('/api/cyclists/new/'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cyclist)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const listAllCyclists = (credentials) => {
    return fetch('/api/cyclists/', {
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
//      console.log(params)
      return fetch('/api/cyclists/by/'+ params.userId+params.search, {
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
    
   const listByUserSearch = (params, credentials) => {
    //  console.log('/api/races/feed/'+ params.userId+params.search)
      return fetch('/api/cyclists/search/'+ params.userId+params.search, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
      }).then(response => {
        return response.json()
      }).catch((err) => console.log(err))
    }  


  const read = (params, credentials) => {
    return fetch('/api/cyclists/'+params.userId+'/' + params.cyclistId, {
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
  
  const update = (params, credentials, cyclist) => {
    return fetch('/api/cyclists/'+params.userId+'/'+ params.cyclistId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t,
        'Update-Last-Updated': params.updateLastUpdated
      },
      body: JSON.stringify(cyclist)
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const remove = (params, credentials) => {
    return fetch('/api/cyclists/'+params.userId+'/'+ params.cyclistId, {
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

  const countCustomersByUser = (params, credentials) => {
    //      console.log(params)
          return fetch('/api/count-customers/by/'+ params.userId, {
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

  const downloadCustomersCSV = (params, credentials) => {
    //      console.log(params)
          return fetch('/api/cyclists-csv/by/'+ params.userId, {
            method: 'GET',
            headers: {
             'Accept': 'application/json',
              'Content-Type': 'application/json',
//              'Access-Control-Expose-Headers': 'Content-Disposition',
//              'Content-Disposition': 'attachment, filename="customers.csv"',
              'Authorization': 'Bearer ' + credentials.t
            }
          }).then(response => {
//            console.log(response)
            return response.json()
            //return response.csv
//            return response.text()
          }).catch((err) => console.log(err))
        }
  
  export {
    listByUser,
    listByUserSearch,
    create,
    listAllCyclists,
    read,
    update,
    remove,
    countCustomersByUser,
    downloadCustomersCSV
  }
  