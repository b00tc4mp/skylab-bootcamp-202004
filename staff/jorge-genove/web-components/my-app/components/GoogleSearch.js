class GoogleSearch extends Component {
    constructor(onGoogleSubmit) {
        super(`<section class="search">
    <form>
        <input type="text" name="googlequery">
        <button>🔍</button>
    </form>
</section>`)

        const form = this.container.querySelector('form')

        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const googleQuery = event.target.googlequery.value

            onGoogleSubmit(googleQuery)
        })
    }
}