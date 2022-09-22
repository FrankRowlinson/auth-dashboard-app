const { verify } = require("jsonwebtoken")

function validateToken(req, res, next) {
  const token = req.header("authorization")
  try {
    const validToken = verify(token, process.env.JWT_SECRET || "secret")
    req.token = validToken
    return next()
  } catch (error) {
    res.json({ hasAccess: false })
  }
}

module.exports = { validateToken }
