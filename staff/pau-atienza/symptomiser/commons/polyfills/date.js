Date.validate = function(object){
    try{
        if (!(object instanceof Date)) throw Error 

        const stringifiedDate = object.toUTCString()


    }catch(error){
        if(error)throw new TypeError(`${object} is not a Date`)
    }
}