const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./models")

app.use(express.json())
app.use(cors())

// routers
const userRouter = require("./routes/User")
app.use("/", userRouter)

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server is running!")
    })
  })
  .catch((error) => console.log(`Error while connecting: ${error.message}`))
