class News extends Component{
    constructor(news, title){
        super(`<div class = 'news'><h2>${title}</h2></div>`)

        if(!news[0]){
            this.container.appendChild(new Feedback(`The site shows no news!`, 'warning').container)
        } 
        else {
            for (let i in news){
                let resultItem = document.createElement("article");
               
                resultItem.innerHTML= 
                    `<a href = ${news[i].link}>
                        <strong>${news[i].title}</strong>
                    </a><br>
                    <img src = ${news[i].image}><br><br>`
                this.container.appendChild(resultItem)      
            }
        } 
    }
}