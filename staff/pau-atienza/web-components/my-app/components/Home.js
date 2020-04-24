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
            console.log(searchOutput)
            debugger
            if (!results) {
                results = new Result(searchOutput, (input) => {
                    const resultItem = document.createElement("li");
                    for (let i in users){
                        resultItem.innerHTML=`${input[i].name} ${input[i].surname}, ${input[i].email}`
                        this.container.appendChild(resultItem)      
                    }
                })

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Result(searchOutput, (input) => {
                    const resultItem = document.createElement("li");
                    for (let i in users){
                        resultItem.innerHTML=`${input[i].name} ${input[i].surname}, ${input[i].email}`
                        this.container.appendChild(resultItem)      
                    }
                })

                _results.container.replaceWith(results.container)
            }
        }).container)

        this.container.appendChild(new Search(input => {
            const searchOutput = googleSearch(input)
        
            if (!results) {
                results = new Result(searchOutput, input =>{
                    for (let i in searchOutput){
                        let resultItem = document.createElement("li");
                        
                        resultItem.innerHTML=`<strong>${input[i].title.textContent}</strong><br>
                        ${input[i].content.textContent}<br>
                        <a href= '${input[i].link}'>${input[i].link}</a><br><br>`
                        this.container.appendChild(resultItem)      
                    }
                }).container

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Result(searchOutput, input => {
                    for (let i in searchOutput){
                        let resultItem = document.createElement("li");
                        
                        resultItem.innerHTML=`<strong>${input[i].title.textContent}</strong><br>
                        ${input[i].content.textContent}<br>
                        <a href= '${input[i].link}'>${input[i].link}</a><br><br>`
                        this.container.appendChild(resultItem)    
                    }
                }).container
                _results.container.replaceWith(results.container)
            }
        }).container)
    }
}