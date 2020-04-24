// TODO show "Welcome, <name>!"
class Home extends Component{
    constructor(name, onLogout){
        super(`<section class="home">
    <h1>Welcome, ${name}!</h1>
    <button id='logout'>Logout</button>
</section>`)
        
        let results
        const self = this
        
    const searchComponent = new Search(function(query){
        const _users = searchUsers(query)

        if (!results) {
            results = Results(_users)

            self.container.appendChild(results)
        } else {
            const _results = results
            
            results = Results(_users)
            
            _results.replaceWith(results)
        }
        
    })

    console.log(this.container)
    
    this.container.appendChild(searchComponent.container)
    
    const logout = this.container.querySelector("#logout")
    logout.addEventListener("click",function(){
        onLogout()
    })
    
    }
}

