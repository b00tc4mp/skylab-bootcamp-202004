class Landing extends Component {
    constructor(onRegister, onLogin) {
        super(`<section class='landing'>
        <a href="" class="landing__a">Register</a>
        <p class="landing__or">or</p>
        <a href="" class="landing__a">Login</a>
    </section>`)

        const [register, login] = this.container.querySelectorAll('a');

        register.addEventListener('click', event => {
            event.preventDefault();
            onRegister()
        });

        login.addEventListener('click', event => {
            event.preventDefault();
            onLogin();
        });
    }
}