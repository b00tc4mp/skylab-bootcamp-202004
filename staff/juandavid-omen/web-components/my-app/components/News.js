class News extends Component {
    constructor(error, data) {
        super(`<section class="news">
        <form>
            <h2>news</h2>
        </form>
    </section>`);

        if (error) {
            this.container.appendChild(new Feedback('sorry, an error has occurred :(', 'error').container);
        } else if (data) {
            if (data.length) {
                const list = document.createElement('ul');

                data.forEach(({ title, content, link }) => {
                    const item = document.createElement('p');

                    item.innerHTML = `
                    <img src=${image}>
                    <h4>
                        <a href=${link}>${title}</a>
                    </h4>
                    <p>${content}</p>
                    <hr>`

                    list.appendChild(item);

                })
                this.container.appendChild(list);

            } 
        }
    };
};
