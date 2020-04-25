//Lista con los resultados de la busqueda de usuarios
class Results extends Component{
    constructor(users){
        super(`<section class="results">
        </section>`)

        //Si se le han pasado usuarios los muestra
        if(users){
            //Crea la lista y la rellena
            const list=document.createElement("ul");
            users.forEach(function({name,surname,email}){
                //Crea un elemento de la lista para rellenarlo y lo mete en la lista
                const item=document.createElement("li");
                item.innerText=`${name} ${surname} (${email})`;
                list.appendChild(item);
            })
            this.container.appendChild(list);
        }else{
            //Si no ha encontrado usuarios muestra un mensaje
            this.container.appendChild(new Feedback("No matches found, try with other words","warning").container);
        }
    }
}