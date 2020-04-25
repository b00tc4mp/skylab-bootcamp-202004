class EcosiaSearch extends Component {
    constructor(onEcosiaSearch){
        super(`<section class="ecosiasearcher">
        <form>
        <label>Ecosia</label>
        <input type="text" name="ecosiaquery">
        <button>🔍<button>
        </form>
        </section>`)
        
        const form = this.container.querySelector('form')

        form.addEventListener('submit', event => {debugger
            event.preventDefault()

            const ecosiaQuery = event.target.ecosiaquery.value

            onEcosiaSearch(ecosiaQuery)
        })
    
    
    
    
    
    }


   








}
