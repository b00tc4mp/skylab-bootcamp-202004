require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const { argv: [, , port = process.env.PORT || 8080] } = process
app.use(express.json())
const { 
  authenticateUser,
  registerUser,
  retrieveUser 
} = require("gluttony-server-logic")

router.get("/users/auth", (req, res) => {
  authenticateUser()

  return res.json({ status: 200 })
});

router.post("/users", (req, res) => {
  res.send(registerUser())
});

router.get("/users", (req, res) => {
  res.send(retrieveUser())
});

app.use("/api", router)

app.listen(port, () => console.log(`Server running on port ${port}`));