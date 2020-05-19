const fs = require('fs');
const path = require('path')

function readFilesList(callback) {
    
    fs.readdir(path.join( __dirname, '..', 'data'), (error, files) => {
        if (error) throw error
        const results = [];
        let count = 0;
        console.log(files)
        for (let i in files) {
            fs.readFile(path.join( __dirname, '..', 'data', files[i]), (error, data) => {
                if (error) throw error

                const obj = JSON.parse(data);
                
                results.push(obj);
                
                count++

                if (count === files.length) callback( undefined, results)
            })
        }
        
    })
}


module.exports = readFilesList

