const{mongoose}=require("..")
const{User}= require(".")

mongoose.connect('mongodb://localhost/skylab')
    .then(() => User.create({name: 'Ramon', surname: 'Mamon', email: 'rm@mail.com', password: '123123123' }))
    .then(user => {debugger})
