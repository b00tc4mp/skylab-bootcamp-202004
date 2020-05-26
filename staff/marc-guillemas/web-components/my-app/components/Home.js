class Home extends Component {
    constructor(name, onLogout) {
        super(`<span> 
        <h1>Welcome ${name}</h1>
        <button>Log out</button>    
        <br>
        </span>`)

        // const button = this.container.querySelectorAll('button')
        // const {search, logout} = button

        
        const button = this.container.querySelector("button");
        button.addEventListener("click", (event) => {
            event.preventDefault();
            onLogout();
        })

        let results


        this.container.appendChild(new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }
        }).container)



        let googleResults
        this.container.appendChild(new Google(query => {
            
            googleSearch(query, (error, data)  => {
                if (!googleResults) {
                    googleResults = new GoogleResults(data)
    
                    this.container.appendChild(googleResults.container)
                } else {
                    const _googleResults = googleResults
    
                    googleResults = new GoogleResults(data)
    
                    _googleResults.container.replaceWith(googleResults.container)
                }
            }) 

           
        }).container)

        let wiredResults
        this.container.appendChild(new Wired(query => {

            wiredSearch(query, (error, data)  => {
                if (!wiredResults) {
                    wiredResults = new WiredResults(data)
    
                    this.container.appendChild(wiredResults.container)
                } else {
                    const _wiredResults = wiredResults
    
                    wiredResults = new WiredResults(data)
    
                    _wiredResults.container.replaceWith(wiredResults.container)
                }
            }) 

           
        }).container)
       

    }
}