const App = require('./components/App')
const search= require("./logic/search-contacts")

App()
/*
search("e-0.36328070524795275@mail.com",(error, contact)=>{
    if(error){
       return  console.log(error)
    }
    console.log(contact)
})
*/
