require("dotenv").config()
const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@gluttony-stegt.gcp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

const { handleError, jwtPromised } = require("./helpers")
const { jwtVerifierExtractor } = require("./middlewares")
const express = require("express")
const app = express()
const router = express.Router()
const { env: { PORT: port, SECRET } } = process
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)
app.use(express.json())

const { 
  authenticateUser,
  registerUser,
  retrieveUser 
} = require("gluttony-server-logic")
const { mongoose } = require("gluttony-data")
mongoose.connect(MONGODB_URL)
  .then(() => {
    router.get("/users/auth", (req, res) => {
      const { query: { email, password } } = req
    
      try {
        authenticateUser(email, password)
          .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: "1d" }))
          .then(token => res.send({ token }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });
    
    router.post("/users", (req, res) => {
      const { body: { name, surname, email, password } } = req
      
      try {
        registerUser(name, surname, email, password)
          .then(() => res.status(201).send())
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }  
    });
    
    router.get("/users", verifyExtractJwt, (req, res) => {
      try {
        const { payload: { sub: userId } } = req
    
        retrieveUser(userId)
          .then(user => res.send(user))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });
    
    app.use("/api", router)
    
    app.listen(port, () => console.log(`Server running on port ${port}`));

    process.on('SIGINT', () => mongoose.disconnect())
  })
