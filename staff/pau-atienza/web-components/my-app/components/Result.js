class Result extends Component{
    constructor(input, searchFunction){super(`<ul class= "search"></ul>`)
        if(!input[0]){
            this.container.appendChild(new Feedback('No results were found', 'warning').container)
        } 
        else {
            searchFunction(input);
            // googleSearch(query)
        }   
    }
}