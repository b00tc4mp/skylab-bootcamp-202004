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

        formSearch.addEventListener('submit', event => {
            event.preventDefault()

            query = formSearch.query.value

            if (query.trim().length > 0 && typeof query != 'undefined') {
                if (result) this.container.removeChild(result.container)
                result = new Results(query)
                
                this.container.append(result.container)
            }
        })
    }
}