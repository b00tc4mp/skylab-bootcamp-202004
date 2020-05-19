class News extends Component {
    constructor() {
        super(`<section class="latest-news">
        <h2>Latest News</h2>
        </section>`)
        
        let temp = document.createElement('div')

        let newsHTML = ''
        
        latestNews((error, results) => {
            if (error) newsHTML = `<p class="feedback--error>"${error.message}</p>`
            else  
                results.forEach(result => newsHTML +=`<article class="results">
                <h3 class="results__title">${result.title}</h3>
                <p class="results__content"> ${result.content}</p>
                <a href="${result.link}">${result.link}</a></article>`)
                newsHTML = '<section class="google-results">'+newsHTML+'</section>'

            temp.innerHTML = newsHTML
            this.container.appendChild(temp)
        })
    }
}

