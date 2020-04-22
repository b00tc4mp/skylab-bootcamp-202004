class Home extends Component {
    constructor(name, toLanding) {
        super(`<section class="home">
        <h1>Welcome, ${name}!</h1><button>Logout</button>
    </section>`)
    

        const button = this.container.querySelector('button')

        button.addEventListener('click', function(){
            toLanding()
        })

        this.container.append(new Search().container)
    }   
}

