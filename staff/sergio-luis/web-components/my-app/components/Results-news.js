class ResultsNews extends Component {
    constructor(items){
        super(`<section class="results">
        <h2>News Result</h2>
    </section>`)

        if(items.length){
            const listResults = document.createElement('div');
            listResults.setAttribute('class','news')

            items.forEach( ({ image, storyEpigraph, title, link})=>{
                // const item = document.createElement('li');
                const resultsContainer = document.createElement('div');
                resultsContainer.setAttribute('class','news__item');

                const imageContainer = document.createElement('img');
                imageContainer.setAttribute('class', `news__img`)
                imageContainer.setAttribute('src', `${image}`)
                resultsContainer.appendChild(imageContainer);

                const divContainer = document.createElement('div');
                divContainer.setAttribute('class', `news__aside`)

                // const storyEpigraphContainer = document.createElement('p');
                // storyEpigraphContainer.setAttribute('class', `news__epigraph`);
                // storyEpigraphContainer.innerText =`${storyEpigraph}`;
                // divContainer.appendChild(storyEpigraphContainer)

                const h2 = document.createElement('h2');

                const linkContainer = document.createElement('a');
                linkContainer.setAttribute('class', `news__title`);
                linkContainer.setAttribute('href', `${link}`);
                linkContainer.innerText =`${title}`
                h2.appendChild(linkContainer);
                divContainer.appendChild(h2)
                
                resultsContainer.appendChild(divContainer);
               
                listResults.appendChild(resultsContainer);
            });

            this.container.appendChild(listResults);
        }else{
            this.container.appendChild(new Feedback('sorry, we don`t find any results','warning').container)
        }
    }
}
