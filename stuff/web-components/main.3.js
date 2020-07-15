function Register(callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value

        callback(name, surname, email, password)
    })

    return container
}

const users = []

document.getElementById('root').appendChild(Register(function (name, surname, email, password) {
    console.log(name, surname, email, password)
}))

document.getElementById('root').appendChild(Register(function (name, surname, email, password) {
    //console.log(name, surname, email, password)
    users.push({
        name,
        surname,
        email,
        password
    })

    console.log(users)
}))