class GoogleResults extends Component {
    constructor(data){
        super(`<section class="results">
        </section>`)

        if(data.length) {
        
            const list= document.createElement('ul')

            data.forEach(({ title, content, link }) => {
                const item = document.createElement('li')
                item.style.listStyle = "none"
                item.innerHTML = `<h4><a href="${link}"> ${title}</a></h4>  <p>${content} </p> `

                list.appendChild(item)

            })
            this.container.appendChild(list)
        }else this.container.appendChild(new Feedback('Sorry, No results were found', 'warning').container)
    }
}