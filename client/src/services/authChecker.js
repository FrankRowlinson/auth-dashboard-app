import axios from "axios"

async function authChecker(cookie) {
  const hasAccess = await axios
    .get("http://localhost:3001/authcheck", {
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
