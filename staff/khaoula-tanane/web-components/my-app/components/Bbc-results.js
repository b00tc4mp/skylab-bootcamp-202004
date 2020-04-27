class BbcResults extends Component{
    constructor(news) {
        super(`<section class="results">
</section>`)

    if (news.length) {
        const list = document.createElement('ul')

        news.forEach(({result}) => {
            const item = document.createElement('li')
/*
            item.innerHTML = `
                <h4>
                    <a href=${link}>${title}</a>
                </h4>
                    <div>${img}</div>
                <hr>
            `
            */
            list.appendChild(result)
        })

        this.container.appendChild(list)
    } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)

    }
}