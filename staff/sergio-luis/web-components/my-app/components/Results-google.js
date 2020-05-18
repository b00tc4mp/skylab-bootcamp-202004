class ResultsGoogle extends Component {
    constructor(items){
        super(`<section class="results">
        <h2>Google Results</h2>
        </section>`)

        if(items.length){
            // const list = document.createElement('ul');
            const list = document.createElement('div');
            list.setAttribute('class','results__container')

            items.forEach( ({title, content, link})=>{
                // const item = document.createElement('li');
                const resultsContainer = document.createElement('div');
                resultsContainer.setAttribute('class','results__container')

                const titleContainer = document.createElement('h1');
                const contentContainer = document.createElement('p');
                const linkContainer = document.createElement('a');
                const line = document.createElement('br')

                titleContainer.innerText = `${title}`
                contentContainer.innerText = `${content}`
                linkContainer.innerText = `${link}`
                linkContainer.setAttribute('href', `${link}`)
                // linkContainer.target='_blanch'
                contentContainer.setAttribute('class', `results__content`)

                resultsContainer.appendChild(titleContainer);
                resultsContainer.appendChild(contentContainer);
                resultsContainer.appendChild(linkContainer);
                resultsContainer.appendChild(line);
                // item.innerText = `${title} ${content} - (${link})`;
                list.appendChild(resultsContainer);
            });

            this.container.appendChild(list);
        }else{
            this.container.appendChild(new Feedback('sorry, we don`t find any results','warning').container)
        }
    }
}
