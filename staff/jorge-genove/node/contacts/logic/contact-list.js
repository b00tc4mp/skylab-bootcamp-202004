const fs = require("fs");
const path = require("path");

const contactList = (callback) => {
  console.log('hola')
  fs.readdir(path.join(__dirname, "..", "data", "contacts"), (error, totalDir) => {
   
    if (error) throw error(error);
    console.log('serginho')

     function extractData(files = totalDir, count = 0, contactList = []) {
      fs.readFile(path.join(__dirname, "..", "data", "contacts", files[count]),(error, data) => {
          if (error) return callback(error); 

          const contact = JSON.parse(data);
          contactList.push(contact);
          count++;
          if (count < files.length) extractData(files, count, contactList);
          else {
            callback(null, contactList);
          }
        }
      );
    }
    extractData();  
  });
};

module.exports = contactList;
