class SearchGoogle extends Component {
    constructor(onSubmit) {
        debugger
        super(`<section class="search">
    <form>
        <input type="text" name="query">
        <button>🔍</button>
    </form>
</section>`)

        const form = this.container.querySelector('form')
        debugger
        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(query)
        })
    }
}