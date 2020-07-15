require('code-this-commons/polyfills/string')
const{models: {Challenge}, mongoose: {ObjectId}} = require('code-this-data')

module.exports = (challengeId) => {
    String.validate.notVoid(challengeId)

    

        return Challenge.deleteOne({_id: ObjectId(challengeId)})

        .then(()=> {return 'challenge deleted'})

}