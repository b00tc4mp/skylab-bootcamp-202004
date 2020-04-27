class HolaNews extends Component {
    constructor(message, level) {
        super(`<section class="hola-news">
            <h2>Hola News</h2>
        </section>`)

        retrieveHolaNews((error, news) => {
            if (error) throw error // TODO handle this error!

            const list = document.createElement('ul')

            news.forEach(({ image, link, text }) => {
                const item = document.createElement('li')

                const anchor = document.createElement('a')
                anchor.href = link
                anchor.target = '_blank'
                
                item.append(anchor)

                const img = document.createElement('img')
                img.src = image

                anchor.append(img)

                const paragraph = document.createElement('p')
                paragraph.innerText = text

                anchor.append(paragraph)

                list.append(item)
            })

            this.container.append(list)
        })
    }
}