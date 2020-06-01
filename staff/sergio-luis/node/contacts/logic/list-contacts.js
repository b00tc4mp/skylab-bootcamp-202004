const fs = require('fs')
const path = require('path')

function listContacts(callback){
    fs.readdir(path.join(__dirname, '..', 'data'), (error,results)=>{
        if(error) return callback(error)

        let obj;
        let count = 0
        let finalResult = []

        results.forEach(file=>{
            fs.readFile(path.join(__dirname,'..','data',file), (error, data) =>{
                if (error) return callback(error)
                    obj = JSON.parse(data);
                    finalResult.push(obj)
                    count ++
                if(results.length===count){
                    callback(null,finalResult)
                }
            }) 
       
        })
      
        
    })
}



// fs.readFile(path.join(__dirname,'..','data','1589836259324.json'), (error, data) =>{
//     if (error) return callback(error)
//                 debugger
//                 obj = JSON.parse(data);
//                 console.table(obj)
// })


module.exports = listContacts