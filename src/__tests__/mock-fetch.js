const getMockFetch = (status, body, location) => () => {
  return new Promise((resolve, reject) => {
    if (!status) {
      reject(new Error())
    } else {
      resolve({
        ok: status >= 200 && status <= 299,
        status: parseInt(status),
        headers: { get: () => location },
        json: () => new Promise((resolve, reject) => {
          if (body) {
            resolve(body)
          } else {
            reject(new Error())
          }
        })
      })
    }
  })
}

export default getMockFetch