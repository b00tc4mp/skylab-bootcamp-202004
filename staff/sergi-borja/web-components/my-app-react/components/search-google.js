class SearchGoogle extends Component {
    constructor(onSubmit) {
        super(`<section class="home-google">    
        <section class="search-google">
            <form>
                <input type="text" name="query">
                <button>🔍</button>
            </form>
        </section>`)

        const form = this.container.querySelector('form')
      
        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(query)
        })
    }
} 