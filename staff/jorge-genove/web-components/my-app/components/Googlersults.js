class GoogleResults extends Component {
    constructor(appends) {
        super(`<section class="results">
    </section>`)

        if (appends.length) {
           
const list = document.createElement('section')
            
            appends.forEach(function ({ tittle,content , link }) {
                const item = document.createElement('p')

                // const { name, surname, email } = user

                item.innerText = `${tittle} ${content} (${link})`

                list.appendChild(item)
            })

            this.container.appendChild(section)
        } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)
    }
}