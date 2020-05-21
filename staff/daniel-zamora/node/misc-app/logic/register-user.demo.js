const registerUser = require('./register-user')

const user={
name: "ander",
surname: "zamora",
email: "ander@gmail.com",
password: "12341234"
}
registerUser(user,console.log)