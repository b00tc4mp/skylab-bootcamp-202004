class GoogleResults extends Component {
    constructor(appends) {
        super(`<section class="results">
    </section>`)

        if (appends.length) {
           
const list = document.createElement('section')
            
            appends.forEach(function ({ title,content , link }) {
                const item = document.createElement('h2')
                const itemP = document.createElement('p')
                const itemLink = document.createElement('p')
                // const { name, surname, email } = user

                item.innerHTML = `${title}`; 
                itemP.innerHTML = `${content}`
                itemLink.innerHTML = `<a href="${link}">${link}<a>`

                list.appendChild(item)
                list.appendChild(itemP)
                list.appendChild(itemLink)
                
            })

            this.container.appendChild(list)
        } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)
    }
}