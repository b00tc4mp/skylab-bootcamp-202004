class ResultsHola extends Component {
    constructor(news) {
        super(`<section class="results-hola">
    </section>`)

        if (news.length) {
            const list = document.createElement('section')
            
            // users.forEach(function (user) {
            //users.forEach(function ({ name, surname, email }) {
            news.forEach(({ title, image, link }) => {
                const item = document.createElement('p')

                // const { name, surname, email } = user

            item.innerHTML = `
                <h4>
                    <a href=${link}>${title}</a>
                </h4>
                <img src=${image} > 
                <hr>`

                list.appendChild(item)
            })

            this.container.appendChild(list)
        } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)
    }
} 