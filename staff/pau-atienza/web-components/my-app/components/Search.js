class Search extends Component{
    constructor(onSubmit, buttonName){
        super(`<section class="search">
            <form>
             <input type="text" name="query">
                <button>${buttonName}</button>
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