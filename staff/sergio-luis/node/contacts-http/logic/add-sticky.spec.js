const assert = require('assert')
const addContact = require('./add-contact')
const addStickie= require("./add-sticky")
const { random } = Math
const fs = require('fs')
const path = require('path')


// {
    let name = `name-${random()}`;
    let tag = `tag-${random()}`;
    let comment = `comment ${random()} comment`;

    //HAPPY
    addStickie({name ,tag ,comment},(error, id)=>{
        assert(!error);

        assert(typeof id === 'string');

        fs.readFile(path.join(__dirname,'..','data','stickies',`sticky-${id}.json`), 'utf-8',(error,body)=>{
            assert(!error)

            assert(body)

            // const stickie= JSON.parse(body);
            const {name: _name , tag:_tag,comment:_comment }= JSON.parse(body);

            // assert.equal(stickie.name,name);
            // assert.equal(stickie.tag,tag)
            // assert.equal(stickie.comment,comment)
            assert.equal(_name,name);
            assert.equal(_tag,tag)
            assert.equal(_comment,comment)
          
            fs.unlink(path.join(__dirname,"..","data","stickies",`sticky-${id}.json`),(error)=>{
                assert(!error)
                fs.access(path.join(__dirname,"..","data","stickies",`sticky-${id}.json`),fs.F_OK,(error)=>{
                    assert(error);
                    assert.equal(error.message,`ENOENT: no such file or directory, access '/Users/sergioluis/Desktop/contacts/5/data/stickies/sticky-${id}.json'`)
                })  
            })
        })
    })

    // UN-HAPPY
    // try{
    //     addStickie({name:undefined ,tag ,comment},(error, id)=>{
    //         assert.equal(true,false)
    //     })
    // }catch({message}){
    //
    // }
    
    assert.throws(()=>{
        addStickie({name:undefined ,tag ,comment},(error, id)=>{
            
            assert.equal(true,false)
        })
    },TypeError)
    
// }




// {
//     const name = `name-${random()}`
//     const surname = `surname-${random()}`
//     const email = `e-${random()}@mail.com`

//     addContact({ name, surname, email }, (error, id) => {
//         assert(!error)

//         assert(typeof id === 'string')

//         fs.readFile(path.join(__dirname, '..', 'data', 'contacts', `${id}.json`), 'utf8', (error, content) => {
//             assert(!error)

//             assert(content)

//             const contact = JSON.parse(content)

//             assert.equal(contact.name, name)
//             assert.equal(contact.surname, surname)
//             assert.equal(contact.email, email)

//             // TODO clean data
//         })
//     })
// }