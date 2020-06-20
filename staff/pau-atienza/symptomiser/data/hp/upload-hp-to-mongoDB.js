const fs = require('fs')
const path = require('path')
const { models: {Term}, mongoose } = require('..')
const { errors: { DuplicityError } } = require('commons')
const { compileFunction } = require('vm')
const MONGODB_URL = "mongodb://localhost:27017/symptomiser-test"

try{
    console.debug('connecting to database')

    mongoose.connect(MONGODB_URL)
        .then(()=>{

            console.info(`connected to database ${MONGODB_URL}`)
    
            Term.deleteMany().then(()=>{

                fs.readFile(path.join(__dirname, "hp.json"), (error, data) =>{
                    if (error) throw error
                
                    data = JSON.parse(data)
                    ;(async function(){
                        for (i in data){
                            let foundterm = await Term.findOne({ HPO_id: data[i].HPO_id})
                                
                            if (foundterm) return new DuplicityError(`term with HPO id ${term.HPO_id} already exists`)
                        
                            await Term.create(data[i])
                            
                        }
                    })()
                        .finally(mongoose.disconnect)
                })
            })
        })
        
}catch(error){
    throw error
}
