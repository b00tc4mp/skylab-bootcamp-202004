require("dotenv").config()
const { env: { PORT: port, SECRET, MONGODB_URI } } = process

const express = require("express")
const app = express()
const router = express.Router()
app.use(express.json())

const { handleError, jwtPromised } = require("./helpers")
const { jwtVerifierExtractor } = require("./middlewares")
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const { 
  authenticateUser,
  registerUser,
  retrieveUser,
  findNearbyBars,
  findNearbyRestaurants,
  addFavourite,
  getFavourites,
  postComment,
  getUserComments
} = require("gluttony-server-logic")
const { mongoose } = require("gluttony-data")
const removeFavourite = require("gluttony-server-logic/src/remove-favourite")

mongoose.connect(MONGODB_URI)
  .then(() => {
    router.post("/users/auth", (req, res) => {
      const { body: { email, password } } = req
    
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
      const { body: { id, name, surname, email, password } } = req
      
      try {
        registerUser(id, name, surname, email, password)
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

    router.get("/bars", (req, res) => {
      try {
        const { query: { latitude, longitude } } = req
    
        findNearbyBars(latitude, longitude)
          .then(bars => res.send({ bars }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });

    router.get("/restaurants", (req, res) => {
      try {
        const { query: { latitude, longitude } } = req
    
        findNearbyRestaurants(latitude, longitude)
          .then(restaurants => res.send({ restaurants }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });

    router.post("/favourites", verifyExtractJwt, (req, res) => {
      const { payload: { sub: userId }, body: { storeId } } = req
      
      try {
        addFavourite(storeId, userId)
          .then(() => res.status(201).send())
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }  
    });

    router.get("/favourites", verifyExtractJwt, (req, res) => {
      const { payload: { sub: userId } } = req

      try {   
        getFavourites(userId)
          .then(favouriteStores => res.send({ favouriteStores }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });

    router.delete("/favourites", verifyExtractJwt, (req, res) => {
      const { payload: { sub: userId }, body: { storeId } } = req

      try {   
        removeFavourite(storeId, userId)
          .then(() => res.status(204).send())
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });

    router.post("/comments", verifyExtractJwt, (req, res) => {
      const { payload: { sub: userId }, body: { id, text, creationDate, storeId } } = req
      
      try {
        postComment(id, text, creationDate, userId, storeId)
          .then(() => res.status(201).send())
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }  
    });

    router.get("/comments", verifyExtractJwt, (req, res) => {
      const { payload: { sub: userId } } = req

      try {   
        getUserComments(userId)
          .then(comments => res.send({ comments }))
          .catch(error => handleError(error, res))
      } catch (error) {
        handleError(error, res)
      }
    });
    
    app.use("/api", router)
    
    app.listen(port, () => console.log(`Server running on port ${port}`));

    process.on('SIGINT', () => mongoose.disconnect())
  })
