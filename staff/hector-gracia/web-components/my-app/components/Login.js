//Ventana de iniciar sesion
class Login extends Component{
    constructor(onSubmit,onRegister){
        super(`<section class="login">
            <h1 class="peter__title">Login</h1>
            <form class="peter__form">
                <input class="peter__input" type="email" name="email" placeholder="e-mail" required>
                <input class="peter__input" type="password" name="password" placeholder="password" required>
                </br>
                <button class="peter__button">SUBMIT</button>
                or <a class="peter__link" href="">I'm new using Peter</a>
            </form>
            </section>`);
        const self=this; //Guarda la referencia a this
        let feedback;//Para saber si tiene que crear un feedback o editarlo
        //Recoge el form y le añade eventos
        const form=self.container.querySelector("form");
        form.addEventListener("submit",function(event){
            event.preventDefault();
            let email= event.target.email.value;
            let password= event.target.password.value;
            try{
                onSubmit(email,password);
                event.target.email.value="";
                event.target.password.value="";
                //Si ya había un mensaje con el feedback lo borra
                if(feedback){
                    self.container.removeChild(feedback.container);
                    feedback=undefined;
                }
            }catch(error){
                //si no había un mensaje con el feedback lo crea
                if(!feedback){
                    feedback= new Feedback(error.message, "error");
                    self.container.append(feedback.container);
                }else{
                    feedback.innerText=error.message;
                }
            }
        })
        //El boton para ir a register
        const register= self.container.querySelector("a");
        register.addEventListener("click",function(event){
            event.preventDefault();
            onRegister();
            form.email.value="";
            form.password.value="";
            if(feedback){
                self.container.removeChild(feedback.container);
                feedback=undefined;
            }
        })
    }
}