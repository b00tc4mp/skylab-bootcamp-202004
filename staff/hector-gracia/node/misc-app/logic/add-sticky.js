const findUser=require("./find-user-by-filter")
const fs=require("fs")
const path=require("path")
// TODO documentation
function addSticky(userId,sticky,callback){
    if(typeof userId!=="string") throw new TypeError(userId+" is not a string");
    if(typeof sticky!=="object") throw new TypeError(sticky+" is not an object");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");

    const{title,description}=sticky;
    if(typeof title==="undefined") throw new Error("missing sticky title");
    if(typeof title!=="string") throw new TypeError(title+" is not a string");
    if(description){
        if(typeof description!=="string") throw new TypeError(description+" is not a string");
    }
    sticky.date=Date.now().toString();
    sticky.id=`${Date.now()}-${Math.random()}`;
    findUser({id:userId},(error,[user])=>{
        if(error)return callback(error);
        if(!user) return callback(new Error(`user with id: ${userId} doesn't exist`));
        sticky.userId=userId;
        fs.writeFile(path.join(__dirname,"..","data","stickies",`${sticky.id}.json`),JSON.stringify(sticky),(error)=>{
            if(error) return callback(error);
            callback(null,sticky.id);
        })
    })
    
}
module.exports=addSticky;