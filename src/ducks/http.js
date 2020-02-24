export const callEndpoint = async (query) => {
  try {
     const queryUrl = 'https://bravenewcoin-v1.p.rapidapi.com/ticker?'+query
    const response = await fetch(queryUrl, {
      method:'GET',
      headers: {
        'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
        'x-rapidapi-key': 'd02f90f79amshc01830fc7cd3502p104187jsnc09f947bdd82'
      }
    })
    const json = await response.json()
    if(response.status == 200 && json) {
      // return resonse if http status is 200 or else throw error.
      return json
    } else {
      const error = new Error(`${response.status} ${response.statusText}`)
      error.response = response
      throw error
    }
  } catch(error) {
      // log error to splunk or kibbana
      throw error
  }

}