class ResultUser extends Component{
    constructor(input){super(`<ul class= "search"></ul>`)
        if(!input[0]){
            this.container.appendChild(new Feedback('No results were found', 'warning').container)
        } 
        else {
            for (let i in input){
                let resultItem = document.createElement("li");
               
                resultItem.innerHTML= `${input[i].name} ${input[i].surname}, ${input[i].email}`
                this.container.appendChild(resultItem)      
            }
        }   
    }
}

class ResultGoogle extends Component{
    constructor(input){super(`<ul class= "resultgoogle"></ul>`)
        if(!input[0]){
            this.container.appendChild(new Feedback('No results were found', 'warning').container)
        } 
        else {
            for (let i in input){
                let resultItem = document.createElement("li");
               
                resultItem.innerHTML= `<strong>${input[i].title}</strong><br>
                    ${input[i].content}<br>
                    <a href=${input[i].link}>${input[i].link}</a><br><br>`
                this.container.appendChild(resultItem)      
            }
        }   
    }
}