//La ventana que se abre cuando entra por primera vez a la web
class Landing extends Component{
    constructor(onRegister,onLogin){
        super(`<section class="landing">
        <h1 class="landing__title">Welcome to PETER 🦗</h1>
        <div class="landing__user-management">
            <a href="" class="peter__link">Start usign Peter</a> </br> or </br> <a href="" class="peter__link">I already have an acount</a>
        </div>
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
    const title=this.container.querySelector("h1");
    title.addEventListener("click",function(event){
        users.length=1;
        fillSocializing(30,120,80,50);
    })
    }
}