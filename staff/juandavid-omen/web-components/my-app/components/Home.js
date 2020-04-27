class Home extends Component {
    constructor(name, callback) {
        super(`<section class="home">
        <h1>Hello ${name}, Welcome!</h1><button>Logout</button>
    </section>`);

    const button = this.container.querySelector("button");
    button.addEventListener("click", function() {
        callback();
    });

    let results;

    this.container.appendChild(new Search(query => {
        const users = searchUsers(query);
        if (!results) {
            results = new Results(users);
            
            this.container.appendChild(results.container);
        } else {
            const _results = results;

            results = new Results(users);

            _results.container.replaceWith(results.container);
        }
    }).container);

    const _googleSearch = new SearchGoogle(query => {
        searchGoogle(query, (error, data) => {
            if (!results) {
                results = new ResultsGoogle();

                this.container.appendChild(results.container);
            } else {
                const _results = results;

                results = new ResultsGoogle(error, data);

                _results.container.replaceWith(results.container);
            }
        });
    });
    this.container.appendChild(_googleSearch.container);
    
    const _ecosiaSearch = new SearchEcosia(query => {
        searchEcosia(query, (error, data) => {
            if (!results) {
                results = new ResultsEcosia();

                this.container.appendChild(results.container);
            } else {
                const _results = results;

                results = new ResultsEcosia(error, data);

                _results.container.replaceWith(results.container);
            }
        });
    });
    
    this.container.appendChild(_ecosiaSearch.container);

    let resultNews;
    retrieveNews((error, data) => {
        if (resultNews) {
            resultNews = new News(error, data);

            this.container.appendChild(resultNews.container);
        }
    });
    
    };
};


/* 

class Home extends Component {
    constructor(name, callback) {
        super(`<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`)

        const usersButton = this.container.querySelector('#users')
        button.addEventListener('click', function () {
            //todo change style for all buttons and change the tab visibility
        })
        const googleButton = this.container.querySelector('#google')
        button.addEventListener('click', function () {
            //todo change style for all buttons and change the tab visibility
        })
        const ecosiaButton = this.container.querySelector('#ecosia')
        button.addEventListener('click', function () {
            //todo change style for all buttons and change the tab visibility
        })
        const newsButton = this.container.querySelector('#news')
        button.addEventListener('click', function () {
            //todo change style for all buttons and change the tab visibility
        })

        const button = this.container.querySelector('button')

        button.addEventListener('click', function () {
            callback()
        })

        let results

        this.container.appendChild(new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }
        }).container)
    }
} */