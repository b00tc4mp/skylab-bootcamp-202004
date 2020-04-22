class Search extends Component {
    constructor() {
        super(`<section class="search">
            <form>
                <input type="text" name="query">
                <button>🔍</button>
            </form>
        </section>`)

        const formSearch = this.container.querySelector('form')

        let result, query

        const self = this

        formSearch.addEventListener('submit', function(event){
            event.preventDefault()

            query = formSearch.query.value

            if (query.trim().length > 0 && typeof query != 'undefined') {
                if (result) self.container.removeChild(result.container)
                result = new Results(query)
                
                self.container.append(result.container)
            }
        })
    }
}