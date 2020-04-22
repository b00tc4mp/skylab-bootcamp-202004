function Register(onSubmit) {

    const template = document.createElement('div');

    template.innerHTML = `<section class="register">
        <h2 class='register__title'>REGISTER</h2>
        <form action="" class="register__form">
            <input class="register__input" type="text" name='name' placeholder="Name">
            <p></p>
            <input class="register__input" type="text" name='surname' placeholder="Surname">
            <p></p>
            <input class="register__input" type="email" name='email' placeholder="E-Mail">
            <p></p>
            <input class="register__input" type="password" name='password' placeholder="Password">
            <p></p>
            <button class='register__button'>On Submit</button>
        </form>
    </section>`;

    const container = template.firstChild;

    const form = container.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = event.target.name.value,
        surname = event.target.surname.value,
        email = event.target.email.value,
        password = event.target.password.value

        onSubmit(name,surname,email,password);
    })



    return container
}
