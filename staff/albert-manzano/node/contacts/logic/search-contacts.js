const fs = require('fs');
const path = require('path');

function searchContacts(query, callback) {
    let wasError = false;
    let count = 0
    const searchResults = []
    fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
        if (error) return callback(error);
        files.forEach((file) => {
            fs.readFile(path.join(__dirname, '..', 'data', file), (error, data) => {
                if (error) {
                    if (!wasError) callback(error);

                    wasError = true;

                    return
                }
                if (!wasError) {

                    data = JSON.parse(data);

                    const { name } = data;

                    if (name.includes(query))searchResults.push(data)

                    count++

                    if (count === files.length -1) callback(null, searchResults)
                    
                }
            });
        });
    });
}

module.exports = searchContacts