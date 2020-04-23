class Result extends Component{
    constructor(input){super(`<ul class= "search"></ul>`)
        //results.length && !results.every(undefined) 
        //results.concat().length  
        if(!input[0]){
            this.container.appendChild(new Feedback('No users were found', 'warning').container)
        } 
        else {
            const resultItem = document.createElement("li");
            for (let i in users){
                resultItem.innerHTML=`${input[i].name} ${input[i].surname}, ${input[i].email}`
                this.container.appendChild(resultItem)      
            }
            // this.container.appendChild(results.container) 
        }   
    }
}