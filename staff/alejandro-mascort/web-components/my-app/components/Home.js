class Home extends Component {
    constructor(name, toLanding) {
        super(`<section class="home">
        <h1>Welcome, ${name}!</h1><button>Logout</button>
        <a href="">Hide/Display Latest News</a>
    </section>`)
    
        const button = this.container.querySelector('button')
        
        const anchor = this.container.querySelector('a')

        button.addEventListener('click', () => {
            toLanding()
        })

        let result

        this.container.append(new Search(query => {
            if (query.trim().length > 0 && typeof query != 'undefined') {
                if (result) this.container.removeChild(result.container)
                result = new Results(query)
                
                this.container.append(result.container)
            }
        }).container)

        this.container.append(new Navigate().container)

        let latestNewsDisplayed = true
        const lastnews = new News()

        this.container.append(lastnews.container)

        anchor.addEventListener('click', event => {
            event.preventDefault()
            debugger
            if (latestNewsDisplayed) {
                this.container.removeChild(lastnews.container)
                latestNewsDisplayed = false
            } else {
                this.container.append(lastnews.container)
                latestNewsDisplayed = true
            }
        })
    }   
}

