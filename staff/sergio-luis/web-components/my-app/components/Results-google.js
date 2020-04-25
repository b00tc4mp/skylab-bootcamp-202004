class ResultsGoogle extends Component {
    constructor(items){
        super(`<section class="results">
        </section>`)

        if(items.length){
            // const list = document.createElement('ul');
            const list = document.createElement('div');

            items.forEach( ({title, content, link})=>{
                // const item = document.createElement('li');

                const titleContainer = document.createElement('h1');
                const contentContainer = document.createElement('p');
                const linkContainer = document.createElement('a');
                const line = document.createElement('br')

                titleContainer.innerText = `${title}`
                contentContainer.innerText = `${content}`
                linkContainer.innerText = `${link}`
                linkContainer.setAttribute('href', `${link}`)

                list.appendChild(titleContainer);
                list.appendChild(contentContainer);
                list.appendChild(linkContainer);
                list.appendChild(line);
                // item.innerText = `${title} ${content} - (${link})`;
                // list.appendChild(item);
            });

            this.container.appendChild(list);
        }else{
            this.container.appendChild(new Feedback('sorry, we don`t find any results','warning').container)
        }
    }
}
