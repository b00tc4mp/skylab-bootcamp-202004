class GoogleSearch extends Component {
    constructor(onGoogleSubmit) {
        super(`<section class="googlesearch">
    <form>
        <label>Google<label>
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