class WiredResults extends Component {
    constructor(data){
        super(`<section class="results">
        </section>`)

        if(data.length) {
        
            const list= document.createElement('ul')

           data.forEach(({ image ,title , link }) => {
                const item = document.createElement('li')
                item.style.listStyle = "none"
               
                item.innerHTML = `<img src ="${image}" > <h4><a href="${link}"> ${title}</a></h4>   `

                list.appendChild(item)

            })
            this.container.appendChild(list)
        }else this.container.appendChild(new Feedback('Sorry, No results were found', 'warning').container)
    }
}