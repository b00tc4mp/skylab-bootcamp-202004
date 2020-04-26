class Home extends Component{
    constructor(user){
        super(`<section class = 'home'> 
                    <h1>Welcome to the best website in the net, ${user.name}</h1>
                    <button>Log out</button>
            </section>`)
        const button = this.container.querySelector('button')
    
        button.addEventListener('click', function(){ 
            home.container.replaceWith(landing.container)
        })

        var searchbar = Component.prototype.mount.call(undefined, `<div class = 'searchbar'>
            <h2>Search at your will</h2>
        </div>`)
        this.container.appendChild(searchbar)
        let results
        searchbar.appendChild(new Search(input => {
            const searchOutput = searchUser(input)
            console.log(searchOutput)

            if (!results) {
                results = new ResultUser(searchOutput).container
                this.container.appendChild(results)
            } else {
                const _results = results

                results = new ResultUser(searchOutput).container

                _results.replaceWith(results)
            }
        },'Search Users🦗').container)

        searchbar.appendChild(new Search(input => {

            googleSearch(input, (error, searchOutput) => {
                if (!results) {
                    results = new ResultGoogle(searchOutput).container
        
                    searchbar.appendChild(results)
                } else {
                    const _results = results
    
                    results = new ResultGoogle(searchOutput).container
        
                    _results.replaceWith(results)
                }
            })
        }, 'Search Google').container)
        
        searchbar.appendChild(new Search(input => {

            ecosiaSearch(input, (error, searchOutput) => {
                if (!results) {
                    results = new ResultGoogle(searchOutput).container
        
                    searchbar.appendChild(results)
                } else {
                    const _results = results
    
                    results = new ResultGoogle(searchOutput).container
        
                    _results.replaceWith(results)
                }
            })
        }, 'Search Ecosia').container)


        holaNews((error, news) => {
            this.container.appendChild(new News(news, 'Enjoy the latest news from HOLA!').container)
        })
    }     
}