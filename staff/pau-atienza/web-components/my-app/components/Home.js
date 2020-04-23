class Home extends Component{
    constructor(user){
        super(`<span> 
            <h1>Welcome ${name}</h1>
            <button>Log out</button>
        </span>`)

        const button = this.container.querySelector('button')
    
        button.addEventListener('click', function(){ 
            home.replaceWith(landing)
        })
        
        this.container.appendChild(new Search())
    }
}