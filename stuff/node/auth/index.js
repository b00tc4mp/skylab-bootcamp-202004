const jwt = require('jsonwebtoken')

const userId = '123'

const SECRET = 'my best of the best of my secrets'

const before = Date.now()

let token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '5s' })

console.log(Date.now() - before)

//token = token.toUpperCase()
//token = 'asdf' + token

setTimeout(() => {
    console.log(Date.now() - before)

    const payload = jwt.verify(token, SECRET)

    console.log(payload)

    console.log(Date.now() - before)
}, 4000)

console.log('...')

