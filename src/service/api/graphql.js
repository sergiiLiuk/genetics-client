import axios from 'axios'

export default async function (query, variables) {
  try {
    const response = await axios.post('http://localhost:5000/api', {
      query,
      variables,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}
