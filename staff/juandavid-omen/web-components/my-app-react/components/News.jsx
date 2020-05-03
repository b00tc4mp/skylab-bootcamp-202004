class News extends Component {
    constructor(error, data) {
        super(`<section class="news">
        <form>
            <h2>news</h2>
        </form>
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


// class HolaNews extends Component {
//     constructor(message, level) {
//         super(`<section class="hola-news">
//             <h2>Hola News</h2>
//         </section>`)

//         retrieveHolaNews((error, news) => {
//             if (error) throw error // TODO handle this error!

//             const list = document.createElement('ul')

//             news.forEach(({ image, link, text }) => {
//                 const item = document.createElement('li')

//                 const anchor = document.createElement('a')
//                 anchor.href = link
//                 anchor.target = '_blank'

//                 item.append(anchor)

//                 const img = document.createElement('img')
//                 img.src = image

//                 anchor.append(img)

//                 const paragraph = document.createElement('p')
//                 paragraph.innerText = text

//                 anchor.append(paragraph)

//                 list.append(item)
//             })

//             this.container.append(list)
//         })
//     }
// }