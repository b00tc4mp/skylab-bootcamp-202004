const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});




// lanzar prompts
// recolectar respustas
// crear con las respuestas un archivo
// archivo estar en formata Json


rl.question("Name ? ", function (name) {
    rl.question("Surname ? ", function (surname) {
        rl.question("phone?", function (phone) {
            rl.question("e-mail?", function (email) {
                rl.question("web?", function (web) {
                    rl.question("insta?", function (instagram) {
                        rl.question("facebook?", function (facebook) {
                            rl.question("twitter?", function (twitter) {
                                rl.question("fwitter?", function (fwitter) {
                                    rl.question("tiktok?", function (tiktok) {
                                        debugger
                                        let data = (name,
                                            surname,
                                            phone,
                                            email,
                                            web,
                                            instagram,
                                            facebook,
                                            twitter,
                                            fwitter,
                                            tiktok)

                                        async function main() {
                                            await writeFile('contacts', JSON.stringify(data))

                                                
                                           
                                        }
                                        main().catch(error => console.log(error))
                                       
                                })
                            })
                        })
                    })
                })
            })
        });
    });
})
rl.close()
})