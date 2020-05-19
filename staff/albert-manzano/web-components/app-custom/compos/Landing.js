class Landing extends Component {
    constructor(toRegister, toLogin) {
        super(`<section class="landing">
        <a href="">Register</a> or <a href="">Login</a>
        </section>`);

        const [register, login] = this.contain.querySelectorAll('a');

        register.addEventListener('click', event => {
            event.preventDefault();

            toRegister();
        })

        login.addEventListener('click', event => {
            event.preventDefault();

            toLogin();
        });
    }
}