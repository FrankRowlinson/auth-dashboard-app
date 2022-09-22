const express = require("express")
const router = express.Router()
const { User } = require("../models")
const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { validateToken } = require("../middlewares/authMiddleware")

const loginErrorText = "Username or Password are wrong"
const emptyFieldsText = "Both login credentials must be specified"

async function validateUser(token) {
  const { name, id } = token
  const user = await User.findOne({
    where: {
      username: name,
      id: id,
    },
  })
  return !!user && user.status
}

async function manageAccess(ids, status) {
  await User.update(
    {
      status: status,
    },
    {
      where: {
        id: [...ids],
      },
    }
  )
}

async function deleteUsers(ids) {
  await User.destroy({
    where: {
      id: [...ids],
    },
  })
}

router.get("/authcheck", validateToken, async (req, res) => {
  const hasAccess = await validateUser(req.token)
  res.json({ hasAccess: hasAccess })
})

router.post("/", validateToken, async (req, res) => {
  const hasAccess = await validateUser(req.token)
  if (hasAccess) {
    const { userIds, action } = req.body
    if (action == 0 || action == 1) {
      await manageAccess(userIds, action)
      res.json("done")
    } else if (action == 2) {
      await deleteUsers(userIds)
      res.json("done")
    }
  } else {
    res.json({ error: "You have no permission for this action!" })
  }
})

router.get("/", async (_, res) => {
  const userList = await User.findAll()
  res.json(userList)
})

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body
  bcrypt.hash(password, 10).then(async (hash) => {
    try {
      await User.create({
        username: username,
        password: hash,
        email: email,
      })
      res.json("success")
    } catch (e) {
      res.json({ errors: e.errors.map((el) => el.message) })
    }
  })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  if (!password || !username) {
    res.json({ error: emptyFieldsText })
  } else {
    const user = await User.findOne({
      where: {
        username: username,
      },
    })
    if (!user) {
      res.json({ error: loginErrorText })
    } else {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          res.json({ error: loginErrorText })
        } else {
          const token = sign(
            { id: user.id, name: user.username },
            process.env.JWT_SECRET || "secret"
          )
          User.update(
            { lastLogin: new Date() },
            {
              where: {
                username: user.username,
                id: user.id,
              },
            }
          ).catch((error) => console.log(error))
          res.json({ token: token })
        }
      })
    }
  }
})

module.exports = router
