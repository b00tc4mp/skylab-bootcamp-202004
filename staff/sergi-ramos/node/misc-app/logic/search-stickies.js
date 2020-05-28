const { find } = require('../data/stickies')

module.exports = (userId, query, callback) => {
    debugger

    find({ userId }, (error, stickies) => {
        if (error) return callback(error)
        if (!stickies) return callback(new Error('no stickies'))
        let _stickies = []
        let count = 0
        stickies.forEach(sticky => {
            let flag = false
            const values = Object.values(sticky)
            values.forEach(value => {
                if (value.includes(query)) {

                    if (flag === false) {
                        _stickies.push(sticky)
                        flag = true
                    }
                }
            })
            if (++count === stickies.length) callback(null, _stickies)
        })
    })
}
