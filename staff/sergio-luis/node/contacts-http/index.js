//Node methods
const http = require('http')
const fs = require('fs')
const path = require('path')

//Methods
const addContact = require('./logic/add-contact')
const addSticky = require('./logic/add-sticky')
const listContacts = require('./logic/list-contacts')
const listStickies = require('./logic/list-stickies')
const searchContacts = require('./logic/search-contacts')

//Components
const ListContacts = require('./components/ListContacts')
const ListStickies = require('./components/ListStickies')
const SearchContacts = require('./components/SearchContacts')
const AddContact = require('./components/AddContact')
const Feedback = require('./components/Feedback')
const AddSticky = require('./components/AddSticky')
const App = require('./components/App')




const server = http.createServer((req, res) => {

    const { url , method, header} = req
    
    res.setHeader('content-type', 'text/html')

    if (url === '/contacts') {
        listContacts((error, contacts) => {
            if (error) throw error

            res.end(App(ListContacts(contacts)))
        })
    } else if (url.startsWith('/search')) {
        if (!url.includes('?')) {
     
            res.end(SearchContacts())
        } else {
            const [, queryString] = url.split('?')

            const [, query] = queryString.split('=')

            searchContacts(query, (error, contacts) => {
                if (error) throw error
              
                res.end(App(`${SearchContacts(query)}${ListContacts(contacts)}`))
            })
        }
    } else if (url === '/add-contact') {
        
        if(method === 'GET'){
            res.end(App(AddContact()))

        }else if(method==='POST'){
            
            req.on('data' , data =>{
                const arrList = data.toString().replace('%40','@').split('&')
                
                let obj = {};
                arrList.forEach(element =>{
                    const split = element.split('=')
                    obj[split[0]] = split[1]
                })
                addContact(obj, (error,id)=>{
                    const {name} = obj
                    
                    if(error){
                        res.end(App(Feedback("Fail:(",'error')))
                    }else{
                        res.end(App(Feedback(`Contact ${name} created!`)))
                    }
                })
            })                
        }
    } else if (url === '/list-contacts'){
        listContacts((error, contacts)=>{
            if(error) res.end(App(Feedback(error.message,'error')))

            else res.end(App(ListContacts(contacts)))
        })
    } else if (url === '/style.css') {
        fs.readFile(path.join(__dirname, url), 'utf8', (error, content) => {
            if (error) throw error

            res.setHeader('Content-Type', 'text/css')

            res.end(content)
        })
    } else if (url === '/add-sticky'){
        if(method === 'GET'){
            res.end(App(AddSticky()))

        }else if(method === 'POST'){
           
            req.on('data' , data =>{
                const arrList = data.toString().split('&')
            
                let obj = {};
                arrList.forEach(element =>{
                    const split = element.split('=')
                    obj[split[0]] = decodeURIComponent(split[1].split('+').join(' '))
                })
                addSticky(obj, (error,id)=>{
                    const {tag} = obj
                    
                    if(error){
                        res.end(App(Feedback("Fail:(",'error')))
                    }else{
                        res.end(App(Feedback(`Sticky ${tag} created!`)))
                    }
                })
            })
        }
    } else if (url === '/list-stickies'){
        listStickies((error, stickies)=>{

            if(error) res.end(App(Feedback(error.message,'error')))
            else res.end(App(ListStickies(stickies)))
        })
    } else {
        res.end(App(Feedback("404 Not Found",'error')))
    }
})

server.listen(8080)

// const http = require('http');

// http.createServer((request, response) => {
//   const { headers, method, url } = request;
//   let body = [];
//   req.on('error', (err) => {
//     console.error(err);
//   }).on('data', (chunk) => {
//     body.push(chunk);
//   }).on('end', () => {
//     body = Buffer.concat(body).toString();
//     // At this point, we have the headers, method, url and body, and can now
//     // do whatever we need to in order to respond to this request.
//   });
// }).listen(8080); // Activates this server, listening on port 8080

// const {body} = req
                // console.log(req.body.name)
                // res && res.content && console.log(res.content)
                // const findBody = (input, query, output = [])=>{
                //     for (let i in Object.values(input)){
                //         if (Object.values(input)[i].toString().includes(query)){output.push(Object.values(input)[i].toString())}
                //     }
                //     return output
                // }
                // const body = findBody(req, 'name')
                // console.log(body)
                // console.log(url)
                // console.log(header)