
const BASE_URL = 'https://animexapi.herokuapp.com/'

export default async function getApiData (endpoint) {
  const requestedUrl = BASE_URL + endpoint
  
  const response = await $
    .get(requestedUrl)
    .fail(console.warn)

  return response
} 