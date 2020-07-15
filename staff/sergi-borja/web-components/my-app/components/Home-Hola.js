class HomeHola extends Component {
    constructor(backToUsers, logoutGoogle) {
        super(`<section class="home-google">
        <p>ÚLTIMA HORA</p>
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

        hola(news => {
            if (!results) {
                results = new ResultsHola(news)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new ResultsHola(news)

                _results.container.replaceWith(results.container)
            }
        })
        }
    }
