class BbcResults extends Component{
    constructor(news) {
        super(`<section class="results">
</section>`)

    if (news.length) {
        const list = document.createElement('ul')

        news.forEach(({link, title}) => {
            const item = document.createElement('li')

            item.innerHTML = `
                <h4>
                    <a href=${link}>${title}</a>
                </h4>
                <hr>
            `

            list.appendChild(item)
        })

        this.container.appendChild(list)
    } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)

    }
}