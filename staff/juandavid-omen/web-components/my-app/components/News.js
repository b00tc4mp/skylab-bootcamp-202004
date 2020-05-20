class News extends Component {
    constructor(error, data) {
        super(`<section class="news">
            <h2>News</h2>
    </section>`);

        retrieveNews((error, data) => {

            if (error) {
                this.container.appendChild(new Feedback('sorry, an error has occurred :(', 'error').container);
            } else if (data) {
                if (data.length) {
                    const list = document.createElement('ul');

                    data.forEach(({ image, content, link }) => {
                        const item = document.createElement('li')

                        const anchor = document.createElement('a')
                        anchor.href = link
                        anchor.target = '_blank'

                        item.append(anchor)

                        const img = document.createElement('img')
                        img.src = image

                        anchor.append(img)

                        const paragraph = document.createElement('p')
                        paragraph.innerText = content

                        anchor.append(paragraph)

                        list.append(item)

                    })
                    this.container.append(list);

                }
            }
            
        });

    };
};
