const {ObjectID} = require('mongodb')

module.exports= symptomList =>{

    (sanitiseElement = function(input){
        if(input instanceof Array ){
            input.forEach(element=>{
                sanitiseElement(element)
            })
        }
        else if (input instanceof Object && !(input instanceof Function) && !(input instanceof Date) && !(input instanceof ObjectID)){
            const keys = Object.keys(input)

            keys.forEach(key=>{
                if(key === "__v") delete input[key]
                else if (key === "_id"){
                    input.id = input._id

                    delete input._id
                }
                else sanitiseElement(input[key])
            })
        }
        else return
    })(symptomList)

    return symptomList
}