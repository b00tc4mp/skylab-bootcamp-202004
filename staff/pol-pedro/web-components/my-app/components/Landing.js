class Landing extends Component{
    constructor(onLogin, onRegister){
        super(`<header class="header">
        <section class="header__landing">
            <h1>MyApp</h1>
            <a href="">Login</a>
            <a href="">Register</a>
            <i class="fas fa-search fa-lg"></i> 
        </section>
    </header>`)

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