class Search extends Component{
    constructor(onSubmit){
        super(`<section class="search">
            <form>
             <input type="text" name="query">
                <button>🦗</button>
            </form><br>
         </section>`)
    
        const form = this.container.querySelector('form')
        // const searchCont = this
        form.addEventListener('submit', event=>{
            event.preventDefault();
            
            var input = event.target.query.value
            onSubmit(input)
             
        })
    }
}