function registerContact(fields){
    const userData={}
    const readline = require("readline");
    const fs=require("fs");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const askUser=(fields,index)=>{
        rl.question(`What is your ${fields[index]}? `,function(answer){
            userData[fields[index]]= answer
            if(index<fields.length-1){
                index++;
                askUser(fields,index)
            }else{
                rl.close()
            }
        })
    }
    askUser(fields,0);
    
    rl.on("close", function() {
        console.log("Saving contact");
    
        saveUser("./data/"+userData.name+userData.surname,0);
    });
    const saveUser=(path, index)=>{
        fs.access(path+index+".json",fs.F_OK,(error)=>{
            if(error){
                fs.writeFile(path+index+".json",JSON.stringify(userData),()=>{
                    console.log("\nContact saved as "+path+index+".json");
                    process.exit(0);
                })
            }else{
                saveUser(path,index+1)
            }
        })
    }
}
module.exports = registerContact
