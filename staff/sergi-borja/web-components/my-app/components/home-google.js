class HomeGoogle extends Component {
    constructor(backToUsers) {
        super(`<section class="home-google">
        <p>TU BUSCADOR FAVORITO</p>
        <button>Back</button>
</section>`)

        const backButton= this.container.querySelector('button')
        
        backButton.addEventListener('click', function(){
            backToUsers()
        })

        let results

        const googleSearch = new SearchGoogle(query => {
            google(query, (data) => {

                if (!results) {
                    results = new ResultsGoogle(data)

                    this.container.appendChild(results.container)
                } else {
                    const _results = results

                    results = new ResultsGoogle(data)

                    _results.container.replaceWith(results.container)
                }
            })

        })

        this.container.appendChild(googleSearch.container)
    }
}