const fs = require('fs')
const path = require('path')
require('../utils/string')
const findSticky=require("../logic/find-sticky-by-filter")

function deleteSticky(stickyId,callback){
    if(typeof stickyId!=="string") throw new TypeError(stickyId+" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a funciton");

    //Check the sticky exist
    findSticky({id:stickyId},(error,[sticky])=>{
        if(error) return callback(error);
        if(!sticky) return callback(new Error(`sticky with id: ${stickyId} doesn't exist`));

        fs.unlink(path.join(__dirname,"..","data","stickies",`${stickyId}.json`),()=>{
            callback(null,{message:"OK"});
        })
    })
}
module.exports=deleteSticky;