function Register() {
    return `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
</section>`
}

document.getElementById('root').innerHTML = Register()

//const form = document.getElementsByTagName('form')[0]
const form = document.querySelector('form')

form.addEventListener('submit', function(event) {
    event.preventDefault()
    
    const name = event.target.name.value,
        surname = event.target.surname.value,
        email = event.target.email.value,
        password = event.target.password.value

    console.log(name, surname, email, password)
})