const fs = require('fs')
const path = require('path')
const { models: {Term}, mongoose } = require('..')
const { errors: { DuplicityError } } = require('../misc-commons')
const MONGODB_URL = "mongodb://localhost:27017/symptomiser"

try{
    console.debug('connecting to database')
    mongoose.connect(MONGODB_URL)
        .then(() =>{
            console.info(`connected to database ${MONGODB_URL}`)
            fs.readFile(path.join(__dirname, "hp.json"), (error, data) =>{
                if (error) throw error
            
                data = JSON.parse(data)
                data.forEach(term =>{
                    return Term.findOne({ HPO_id: term.HPO_id})
                        .then(foundterm => {
                            if (foundterm) return new DuplicityError(`term with HPO id ${term.HPO_id} already exists`)
                
                            return Term.create(term)
                        })
                        .then(() => {})
                        .catch(error => {throw error})
                })
            })
        })
}catch(error){
    throw error
}