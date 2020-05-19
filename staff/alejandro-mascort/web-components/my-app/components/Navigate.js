class Navigate extends Component {
    constructor() {
        super(`<section class="google-search">
            <form>
                <input type="text" name="query" placeholder="google something!">
                <button>🔍</button>
            </form>
        </section>`)
        const form = this.container.querySelector('form')
        
        let query

        let temp = document.createElement('div')

        let googleHTML = ''

        form.addEventListener('submit', event => {
            event.preventDefault()

            query = form.query.value

            debugger
            if (query.trim().length) 
                google(query, (error, results) => {
                    if (temp.innerHTML.trim().length) this.container.removeChild(temp)   

                    googleHTML = ''
                    if (error) googleHTML = `<p class="feedback--error>"${error.message}</p>`
                    else {  
                        if (results.length) {
                            results.forEach(result => googleHTML +=`<article class="results">
                            <h3 class="results__title">${result.title}</h3>
                            <p class="results__content"> ${result.content}</p>
                            <a href="${result.link}">${result.link}</a></article>`)
                            googleHTML = '<section class="google-results">'+googleHTML+'</section>'
                        } else {    
                            googleHTML += '<section class="google-results"><p class="google-results--not-found feedback--warning">There are no results for this query :(</p></section>'
                        }
                    temp.innerHTML = googleHTML
                    this.container.appendChild(temp)
                    }
                })
            
        })
    }
}

