const registerUser = require('./register-user')

try {
    //registerUser('Pepito', 'Grillo', 'pepigri@mail.com', '123')
    registerUser('Menga', 'Nito', 'menganito@mail.com', '123')
        .then(() => console.log('OK'))
        .catch(error => console.error('KO async', error))
} catch(error) {
    console.error('KO sync', error)
}