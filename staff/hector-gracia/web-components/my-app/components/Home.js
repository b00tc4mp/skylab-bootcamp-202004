//Ventana que ve el usuario tras loguearse
class Home extends Component{
    constructor(name,onLogOut){
        //Le pasa el template para crear el container
        super(`<section class="home">
        <h1>Welcome, ${name}!</h1><button>Logout</button>
    </section>`);
    const self=this; //Guarda una referencia a la instancia para poder usarla al crear Search
    //Recoge el boton de logout para poder asignarle un evento
    const button =this.container.querySelector("button");
    button.addEventListener("click",function(){
        onLogOut();
    });
    let results;//Para ver si tiene que crear la ventana con los resultados o editarla
    //Añade la ventana con los resultados de la busqueda de usuarios
    this.container.appendChild(new Search(function(query){
        const users= searchUser(query);
        if(!results){
            results= new Results(users);
            //Le añade al container de home el container con los resultados
            self.container.appendChild(results.container);
        }else{
            const _results=results;
            results=new Results(users);
            _results.container.replaceWith(results.container);
        }

    }).container)
    }
}

//Añade el boton de añadir mensajes
    //container.appendChild(Send(sendPete,name));