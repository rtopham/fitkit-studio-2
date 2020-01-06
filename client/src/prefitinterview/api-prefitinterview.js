const create = (params, prefitinterview) => {
    return fetch('/api/prefitinterview/new/'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prefitinterview)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const listByUser = (params, credentials) => {
//         console.log(params)
          return fetch('/api/prefitinterviews/by/'+ params.userId, {
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

      return fetch('/api/prefitinterviews/by/cyclist/'+ params.cyclistId, {
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
      console.log(params)
      return fetch('/api/prefitinterviews/'+params.userId+'/' + params.interviewId, {
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

    const update = (params, credentials, interview) => {
      return fetch('/api/prefitinterviews/'+params.userId+'/'+ params.interviewId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(interview)
      }).then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
    }

    const remove = (params, credentials) => {
      return fetch('/api/prefitinterviews/'+params.userId+'/'+ params.interviewId, {
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


    const removeCyclistInterviews = (params, credentials) => {
      return fetch('/api/prefitinterviews/delete/'+params.userId+'/'+ params.cyclistId, {
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

//***everything below is junk */

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



  

  

  
  export {
    listByUser,
    listByCyclist,
    listByUserSearch,
    create,
    listAllCyclists,
    read,
    update,
    remove,
    removeCyclistInterviews
  }
  