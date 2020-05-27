require('dotenv').config()

// const { PORT, SECRET } = process.env //PERGUNTAR MANU!!!
const PORT = 8080
const SECRET = 'my secret roberto'

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, addContact,listContacts ,searchContacts,unRegister,removeContact,addSticky,listStickies,searchStickies,retrieveSticky,removeSticky} = require('./logic')
const bodyParser = require('body-parser')
const parseBody = bodyParser.json()
const { name, version } = require('./package.json')

const app = express()


const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt

/////////
// USERS
////////

app.post('/users', parseBody, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password, error => {
            if (error) return res.status(409).json({ error: error.message })

            res.status(201).send()
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})

app.post('/users/auth', parseBody, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password, (error, userId) => {
            if (error) return res.status(401).json({ error: error.message })

            const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '1d' })

            res.send({ token })
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})

app.get("/users/self",(req,res)=>{
    try {
        const  [,token] = req.header('authorization').split(' ') 
        
        const { sub: userId } = jwt.verify(token, SECRET)        
      
            retrieveUser(userId,(error,user)=>{
                if (error) return res.status(401).json({ error: error.message })
                res.send(user)
            })
           
        }catch(error) {
            if (error instanceof JsonWebTokenError)
            res.status(401)
        else
            res.status(406)
    
        res.json({ error: error.message })
        }
})

app.get('/users/userId:user', (req, res) => {
    try {
    const {url} =req
    const [ ,_userId] =  url.split(':')
    const  [,token] = req.header('authorization').split(' ') 
    
    jwt.verify(token, SECRET)
    
    //const  userId = req.header('Authorization') 
   
        retrieveUser(_userId,(error,user)=>{
          
            if (error) return res.status(401).json({ error: error.message })
            res.send(user)
        })
       
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})


app.delete('/users/remove',parseBody ,(req, res) => {
    try {
    const  [,token] = req.header('authorization').split(' ')
    const  { sub: userId } = jwt.verify(token, SECRET)
    const{body: {email, password}} = req
    debugger
    unRegister(userId,email,password,(error,user)=>{
            if (error) return res.status(401).json({ error: error.message })
            res.send(user)
        })
       
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})


/////////
// CONTACTS
////////

//POST -CONTACTS
app.post('/contacts', parseBody, (req, res) => {
    try {
        const  [,token] = req.header('authorization').split(' ') 

        const { body: contact } = req

        const { sub: userId } = jwt.verify(token, SECRET)
    

        addContact(userId, contact, (error, contactId) => {
            if (error) return res.status(401).json({ error: error.message })

            res.send({ contactId })
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})
//GET -CONTACTS by id
app.get('/contacts/searchid:contactId',parseBody, (req, res) => {
    try {
        const {url} =req
        const [ ,contactId] =  url.split(':')

        const  [,token] = req.header('authorization').split(' ') 
        const { sub: userId } = jwt.verify(token, SECRET)

        listContacts(userId,(error,contacts)=>{
            if (error) {
                return res.status(401).json({ error: error.message })
            }
     
            let result = false;
        
            contacts.forEach(contact =>{
                const {id}= contact
                if(id === contactId) result=contact;
                
            });
            result ? res.send(result):res.status(401).json({ error: "not found" });
        })
      
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})

//GET all contact
app.get('/contacts/all',parseBody, (req, res) => {

    const  [,token] = req.header('authorization').split(' ') 
    const { sub: userId } = jwt.verify(token, SECRET)  
    debugger
    try {
        listContacts(userId,(error,contacts)=>{
            if (error) {
                debugger
                return res.status(401).json({ error: error.message })
            }

          res.send(contacts)
        })
      
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})

//Search contact by query

app.get('/contacts/searchQuery:query',parseBody, (req, res) => {
    try {
        const {url} =req
        const [ ,query] =  url.split(':')
        
        const  [,token] = req.header('authorization').split(' ') 
        const { sub: userId } = jwt.verify(token, SECRET)
    
        searchContacts(userId,query,(error,contacts)=>{
            if (error) return res.status(401).json({ error: error.message })
      
          res.send(contacts)
        })
      
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})


app.delete("/contacts/remove",parseBody,(req,res)=>{
    try{
        const  [,token] = req.header('authorization').split(' ') 
        const { sub: userId } = jwt.verify(token, SECRET)

        const{body: {contactId}} = req

        removeContact(userId , contactId , (error,result)=>{
            if (error) return res.status(401).json({ error: error.message })
      
            res.send(result)
        })
    }catch(error){
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})


////////////
// STICKIESsss
///////////
//POST -stickies
app.post('/stickies', parseBody, (req, res) => {
    try {
        const  [,token] = req.header('authorization').split(' ') 

        const { body: stickie } = req

        const { sub: userId } = jwt.verify(token, SECRET)
        addSticky(userId,stickie,(error,stickyId)=>{
            if(error) return res.status(401).json({ error: error.message })
            res.send(stickyId)
        })
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
})
//GET -stickies by id
app.get('/stickies/searchid:stickyId',parseBody, (req, res) => {
    try {
        const {url} =req
        const [ ,stickyId] =  url.split(':')

        const  [,token] = req.header('authorization').split(' ') 
        const { sub: userId } = jwt.verify(token, SECRET)

        retrieveSticky(userId,stickyId,(error,sticky)=>{

            if (error) {
                return res.status(401).json({ error: error.message })
            }
            res.send(sticky)
        })
      
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})

//GET all contact

app.get('/stickies/all',parseBody, (req, res) => {
    try {
    const  [,token] = req.header('authorization').split(' ') 
    const { sub: userId } = jwt.verify(token, SECRET)  
  
        listStickies(userId,(error,stickies)=>{
            if (error) {
                return res.status(401).json({ error: error.message })
            }
          res.send(stickies)
        })
      
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})

//Search contact by query

app.get('/stickies/searchQuery:query',parseBody, (req, res) => {
    try {
        const {url} =req
        const [ ,query] =  url.split(':')
        
        const  [,token] = req.header('authorization').split(' ') 
        const { sub: userId } = jwt.verify(token, SECRET)
    
        searchStickies(userId,query,(error,stickies)=>{
            if (error) return res.status(401).json({ error: error.message })
      
          res.send(stickies)
        })
      
    }catch(error) {
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})
app.delete("/stickies/remove",parseBody,(req,res)=>{
    try{
        const  [,token] = req.header('authorization').split(' ') 
        const { sub: userId } = jwt.verify(token, SECRET)
debugger
        const{body: {stickyId}} = req
        removeSticky(userId,stickyId,(error,result)=>{
            if(error) return res.status(401).json({ error: error.message })
            res.send(result)
        })
    }catch(error){
        if (error instanceof JsonWebTokenError)
        res.status(401)
    else
        res.status(406)

    res.json({ error: error.message })
    }
})



app.get('*', (req, res) => {
    res.status(404).send('Not Found :(')
})

app.listen(PORT, () => console.log(`${name} ${version} running on port ${PORT}`))