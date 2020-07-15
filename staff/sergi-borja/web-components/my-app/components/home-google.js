class HomeGoogle extends Component {
    constructor(backToUsers, logoutGoogle) {
        super(`<section class="home-google">
        <p>TU BUSCADOR FAVORITO</p>
        <button id="back">back</button>
        <button id="logout">Logout</button>
</section>`)

        const backButton= this.container.querySelector('#back')
        
        backButton.addEventListener('click', function(){
            backToUsers()
        })

        const logoutButton= this.container.querySelector('#logout')
        
        logoutButton.addEventListener('click', function(){
            logoutGoogle()
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