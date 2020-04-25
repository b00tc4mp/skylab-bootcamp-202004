//Componente para mandar mensajes
class Send extends Component{
    constructor(onSend,username){
        super(`<section class="send">
            <input type="text" value="What is in your mind?"></input>
            <button>Send</button>
        </section>`);
        let send=container.querySelector("button");
        let input=container.querySelector("input");
        //Boton de enviar
        send.addEventListener("click",function(){
            onSend(input.value,username);
            input.value="";
        })
    }
}


/*
function Send(onSend,username){
    //Componente para enviar tweets
    const temp = document.createElement('div');
    temp.innerHTML = `<section class="send">
    <input type="text" value="What is in your mind?"></input>
    <button>Send</button>
</section>`
    const container=temp.firstChild;
    let send=container.querySelector("button");
    let input=container.querySelector("input");
    //Boton de enviar
    send.addEventListener("click",function(){
        onSend(input.value,username);
        input.value="";
    })
    return container;
}
*/