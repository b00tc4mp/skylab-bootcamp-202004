//Ventana con los mensajes de error y/o alerta que recibe el usuario
class Feedback extends Component{
    constructor(message,level){
        //Le manda el template del mensaje al constructor de component
        super(`<p class="feedback feedback--${level}">${message}</p>`);
    }
}