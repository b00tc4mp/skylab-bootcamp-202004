const { find } = require('../data/contacts')

module.exports = (userId, query, callback) => {
    debugger

    find({ userId }, (error, users) => {
        if (error) return callback(error)

        let _users = []
        let count = 0
        users.forEach(user => {
            let flag = false
            const values = Object.values(user)
            values.forEach(value => {
                if (value.includes(query)) {

                    if (flag === false) {
                        _users.push(user)
                        flag = true
                    }

                }


            })
            if (++count === users.length) callback(null, _users)
        })


    })
}
