class Landing extends Component{
    constructor(props) {
        super(props)

        this.state = {
            header: 'login&register'
        }
    }

    render = () => {
        return <header className="header">
            <section className="header__landing">
                <h1>MyApp</h1>
                {!this.props.userInfo && <a href="" onClick={ event => {
                event.preventDefault()
                this.props.onLogin()
                }}>Login</a>}
                {!this.props.userInfo && <a href="" onClick={ event => {
                event.preventDefault()
                this.props.onRegister()
                }}>Register</a>}
                {this.props.userInfo && <i className="fas fa-search fa-lg" i onClick={ () => { this.props.onNavigator() }}></i>}
                {this.props.userInfo && <h2>{this.props.userInfo.name} {this.props.userInfo.surname}</h2>}
            </section>
        </header>
    }
}





// class Landing extends Component{
//     constructor(onLogin, onRegister){
//         super(`<header class="header">
//         <section class="header__landing">
//             <h1>MyApp</h1>
//             <a href="">Login</a>
//             <a href="">Register</a>
//             <i class="fas fa-search fa-lg"></i> 
//         </section>
//     </header>`)

//         const [login, register] = this.container.querySelectorAll('a')

//         login.addEventListener ('click', function(event) {
//             event.preventDefault();
//             onLogin();
//         });

//         register.addEventListener ('click', function() {
//             event.preventDefault();
//             onRegister();
//         });
//     }
// }