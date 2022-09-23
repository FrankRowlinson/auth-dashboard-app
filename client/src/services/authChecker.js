import axios from "axios"

async function authChecker(cookie) {
  const hasAccess = await axios
    .get(`${process.env.REACT_APP_HOST}authcheck` || "https://frank-rowlinson-app1.herokuapp.com/authcheck", {
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
