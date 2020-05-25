class GoogleResults extends Component{
    constructor(searchReasults) {
        super(`<section class="results">
</section>`)

    if (searchReasults.length) {
        const list = document.createElement('ul')

        searchReasults.forEach(({content, link, title}) => {
            const item = document.createElement('li')

            item.innerHTML = `
                <h4>
                    <a href=${link}>${title}</a>
                </h4>
                <p>${content}</p>
                <hr>
            `

            list.appendChild(item)
        })

        this.container.appendChild(list)
    } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)

    }
}