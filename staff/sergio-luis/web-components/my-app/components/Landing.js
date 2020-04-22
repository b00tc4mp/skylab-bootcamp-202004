function Landing(onRegister, onLogin) {

    const template = document.createElement('div');

    template.innerHTML = `<section class='landing'>
        <a href="" class="landing__a">Register</a>
        <p class="landing__or">or</p>
        <a href="" class="landing__a">Login</a>
    </section>`;

    const container = template.firstChild;

    const [register, login] = container.querySelectorAll('a');

    register.addEventListener('click', function(event) {
        event.preventDefault();
        onRegister()
    });

    login.addEventListener('click', function(event) {
        event.preventDefault();
        onLogin();
    });

    return container
}