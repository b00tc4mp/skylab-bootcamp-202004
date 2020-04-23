class Home extends Component{
    constructor(user){
        super(`<span> 
                <h1>Welcome ${user.name}</h1>
                <button>Log out</button>
            </span>`)
        const button = this.container.querySelector('button')
    
        button.addEventListener('click', function(){ 
            home.container.replaceWith(landing.container)
        })
        let results

        this.container.appendChild(new Search(input => {
            const searchOutput = searchUser(input)

            if (!results) {
                results = new Result(searchOutput)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Result(searchOutput)

                _results.container.replaceWith(results.container)
            }
        }).container)
    }
}