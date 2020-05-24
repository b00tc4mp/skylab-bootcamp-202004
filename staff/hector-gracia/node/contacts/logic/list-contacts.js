const fs= require("fs");

function listContact(fields){
    fs.readdir("./data",(error,files)=>{
        if(error)return console.log(error);
        else{
            let firstRow=""
            for(var i=0;i<fields.length;i++){
                firstRow+=`${fields[i]}    `
            }
            console.log(firstRow)
            logContact(files,0)
        }
    })
    const logContact=(files,index)=>{
        if(index<files.length)
        fs.readFile("./data/"+files[index].toString(),(error,data)=>{
            if(error) return console.log(error)
            else{
                const contact=JSON.parse(data)
                let currentRow="";
                console.log(`${contact.name}    ${contact.surname}    ${contact.phone}    ${contact.email}`)
                index++;
                logContact(files,index);
            }
        })
    }
} 
module.exports=listContact