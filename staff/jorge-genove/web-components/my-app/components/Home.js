class Home extends Component {
    constructor(name, callback) {
        super(`<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`)

        const button = this.container.querySelector('button')

        button.addEventListener('click', function () {
            callback()
        })

        let results

        

        this.container.appendChild(new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)

                //this.container.appendChild(results.container)
                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }
        }).container)
        
        

        let googleresult;

        this.container.appendChild(new GoogleSearch(googleQuery => {
              googleSearch(googleQuery, (error, results) => {
                
                if(!googleresult) {
                    googleresult = new GoogleResults(results).container
                
                    this.container.appendChild(googleresult)
                }else {
                    const _googleresult = googleresult

                    googleresult = new GoogleResults(results).container

                    _googleresult.replaceWith(googleresult)
                }
            })
        }).container) 
           
        } 

    }       
