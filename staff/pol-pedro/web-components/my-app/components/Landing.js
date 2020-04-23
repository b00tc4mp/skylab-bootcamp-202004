class Landing extends Component{
    constructor(onLogin, onRegister){
        super(`<section class="landing">
        <h1>Welcome, to my App</h1>
        <a href="">Login</a> <a href="">Register</a>
        </section>`)

        const [login, register] = this.container.querySelectorAll('a')

        login.addEventListener ('click', function(event) {
            event.preventDefault();
            onLogin();
        });

        register.addEventListener ('click', function() {
            event.preventDefault();
            onRegister();
        });
    }
}