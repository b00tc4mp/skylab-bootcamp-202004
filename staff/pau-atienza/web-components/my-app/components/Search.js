class Search extends Component{
    constructor(){super(`<form>
        <input type="text" name = 'text'>
        <button>🦗</button>
    </form>`)
    
    const form = this.container.querySelector('form')
    const searchCont = this
    form.addEventListener('submit', function(event){
        event.preventDefault();
        
        var input = event.target.text.value
        var results = searchUser(input)

        if(results[0] === undefined){
            searchCont.appendChild(new Result('No users were found').container)
        } 
        else {

            result = new Result(users)
            searchCont.appendChild(result.container)
            var temp
            
        }    
    })
    }
}