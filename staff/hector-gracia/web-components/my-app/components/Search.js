//Ventana para buscar usuarios
class Search extends Component{
    constructor(onSubmit){
        super(`<section class="search">
            <form>
                <input type="text" name="query">
                <button>🔍</button>
            </form>
        </section>`);
    //Añade el evento de buscar
    const form =this.container.querySelector("form");
    form.addEventListener("submit",function(event){
        event.preventDefault();
        onSubmit(event.target.query.value);
    })
    }
}