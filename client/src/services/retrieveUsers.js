import axios from 'axios'

const HOST = process.env.REACT_APP_HOST || "http://localhost:3001/"

async function retrieveUsers() {
  const response = await axios.get(HOST)
  return response.data
}

export default retrieveUsers