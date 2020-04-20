const users = [{name: "a", surname: "a", email: "a@a", password: "a"}]

const register = Register(function (name, surname, email, password) {
    // TODO if user already exists throw Error, otherwise proceed

    const existingUser = users.find(user => user.email === email)
    console.log(existingUser)

    if(existingUser){
        return register.appendChild(Feedback('user already exists', 'error'))
    }

    users.push({
        name,
        surname,
        email,
        password
    })

    clearForm(register)

    register.replaceWith(login)
}, function(){
    clearForm(register)
    register.replaceWith(login)
})

function clearForm(form){
    form.querySelectorAll('input').forEach(input =>  input.value = "")
}

const login = Login(function (email, password) {
    const user = users.find(function(user) { 
        return user.email === email && user.password === password 
    })

    if (user) {

        clearForm(login)

        login.replaceWith(home(user.name))
    }
    else {
        login.appendChild(Feedback('wrong credentials', 'error'))
    }
},  function(){
    clearForm(login)
    login.replaceWith(register)
})

function home(name){
    const homeContainer =  Home(name, function(){
        homeContainer.replaceWith(landing)
    })
    return homeContainer
}


const landing = Landing(function(){
    landing.replaceWith(register)
},function(){
    landing.replaceWith(login)
})

document.getElementById('root').appendChild(landing)