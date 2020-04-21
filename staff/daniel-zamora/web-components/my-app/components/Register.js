function Register(checkRegister, callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}>
        <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}>
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required pattern="[A-Za-z0-9]{1,20}>
        <button>Submit</button>
        or <a href="">Login</a>
    </form>
    <p class="feedback feedback--success"></p>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value


    let success;

    try {
      checkRegister(email);
      event.target.email.value = "";
      event.target.password.value = "";
      
      if (success) container.removeChild(success);
    } catch (error) {
      if (!success) {
        feedback = Feedback(error.message, "success");

        container.append(success);
      } else feedback.innerHTML = error.message;
    }

        callback(name, surname, email, password)
    })

    return container
}