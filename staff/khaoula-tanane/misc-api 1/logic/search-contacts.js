const { contacts: { find } } = require('../data')
const { UnexistanceError } = require("../errors/");

// module.exports = (userId, query) => {
//     // TODO validate input fields
//     // TODO check user exists, otherwise error
//     return new Promise((resolve, reject) => {

//         find({userId, query}, (error, [contact]) => {
//             if (error)  return reject(error)
//             if (!contact) return reject(new UnexistanceError(`contact with id ${userId} does not exist`))

//             resolve(contact)
//         })
//     })
// }


module.exports = (userId, query) => {

return new Promise((resolve, reject) => {

    find({ userId }, (error, contacts) => {
        if (error) return reject(error)
        if (!contact) return reject(new UnexistanceError(`contact with id ${userId} does not exist`))
        
        let _contacts = []
        let count = 0
        contacts.forEach(contact => {
            let flag = false
            const values = Object.values(contact)
            values.forEach(value => {
                if (value.includes(query)) {
                    if (flag === false) {
                        _contacts.push(contact)
                        flag = true
                    } 
                }
            }) 
            if (++count === contacts.length) resolve(_contacts)
        })
        
    })

    })
}