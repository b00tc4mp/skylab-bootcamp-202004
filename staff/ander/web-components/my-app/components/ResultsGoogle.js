class ResultsGoogle extends Component {
    constructor(data) {
        super(`<section class="results">
    </section>`)

        if (data.length) {
            const list = document.createElement('section')
            debugger
            // users.forEach(function (user) {
            //users.forEach(function ({ name, surname, email }) {
            data.forEach(({ title, content, link }) => {
                const item = document.createElement('p')

                // const { name, surname, email } = user

            item.innerHTML = `
                <h4>
                    <a href=${link}>${title}</a>
                </h4>
                <p>${content}</p>
                <hr>`

                list.appendChild(item)
            })

            this.container.appendChild(list)
        } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)
    }
}