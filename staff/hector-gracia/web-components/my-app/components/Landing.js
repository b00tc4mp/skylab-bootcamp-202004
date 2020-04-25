//La ventana que se abre cuando entra por primera vez a la web
class Landing extends Component{
    constructor(onRegister,onLogin){
        super(`<section class="landing">
        <a href="">Register</a> or <a href="">Login</a>
        </section>`);
    //Recoge los botones de register y login
    const [register, login] = this.container.querySelectorAll('a');
    //Cambia de pagina en funcion del enlace pulsado
    register.addEventListener("click",function(event){
        event.preventDefault();
        onRegister();
    });
    login.addEventListener("click",function(event){
        event.preventDefault();
        onLogin();
    })
    }
}