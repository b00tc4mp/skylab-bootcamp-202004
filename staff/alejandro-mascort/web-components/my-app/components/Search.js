class Search extends Component {
    constructor(callback) {
        super(`<section class="search">
            <form>
                <input type="text" name="query" placeholder="search users">
                <button>🔍</button>
            </form>
        </section>`)

        const form = this.container.querySelector('form')
        
        let query

        form.addEventListener('submit', event => {
            event.preventDefault()

            query = form.query.value

            callback(query)
        })
    }
}