function Landing(onRegister, onLogin) {
    Component.call(this, `<section class="landing">
        <a href="">Register</a> or <a href="">Login</a>
    </section>`);


    const [register, login] = this.container.querySelectorAll('a');

    register.addEventListener('click', function (event) {
        event.preventDefault();

        onRegister();
    })

    login.addEventListener('click', function (event) {
        event.preventDefault();

        onLogin();
    })

    return container;
}