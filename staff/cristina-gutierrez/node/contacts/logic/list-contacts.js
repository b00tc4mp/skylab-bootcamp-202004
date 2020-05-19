// TODO list contacts in a column
// Name     Surname     E-mail      Phone       Age     Birthdate
// a        b           e@mail.com  123         30      1-1-1
// ...
// - read all json files from data
// - output each file info in a row

const path = require("path");
const fs = require("fs");

function listContacts(callback) {
    fs.readdir(path.join(__dirname, "..", "data"), (error, totalDir) => {
            if (error) return callback(error);
            extractData(totalDir);

        function extractData(files = totalDir, count = 0, contactList = []) {
            fs.readFile(
                path.join(__dirname, "..", "data", files[count]),
                (error, data) => {
                    if (error) return callback(error);

                    const contact = JSON.parse(data);
                    contactList.push(contact);
                    count++;
                    if (count < files.length) {
                        extractData(files, count, contactList)
                    } else {
                        let result = `name surname phone email birth country`;
                    
                        contactList.forEach(
                            ({name, surname, email, phone, birth, country }) => {
                                result += `/n${name} ${surname} ${email} ${phone} ${birth} ${country}`;
                            }
                        ); console.log(result);
                        callback(undefined, result);
                    }
                }
            )
        }
    })
}
module.exports = listContacts