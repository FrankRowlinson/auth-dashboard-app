import axios from "axios"

const HOST = process.env.REACT_APP_HOST || "http://localhost:3001/"

async function authChecker(cookie) {
  const hasAccess = await axios
    .get(`${HOST}authcheck`, {
      headers: {
        authorization: cookie.authToken,
      },
    })
    .then((res) => {
      return res.data.hasAccess
    })
  return hasAccess
}

export default authChecker
