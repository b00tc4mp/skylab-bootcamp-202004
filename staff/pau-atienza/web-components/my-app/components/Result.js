class Result extends Component{
    constructor(users){super(`<ul class= "search"></ul>`)

        for (i in users){
            temp = document.createElement("li");
            temp.innerHTML=`${results[i].name} ${results[i].surname}, ${results[i].email}`
            result.container.appendChild(temp)      
        }
    }
}