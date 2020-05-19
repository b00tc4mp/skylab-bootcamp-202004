class Home extends Component {
    constructor(name, callback) {
        
        super(`<section class="home">
            <h1>Welcome, ${name}!</h1><button class=" button button--logout" >Logout</button>
            </section>`);

        const button = this.contain.querySelector('button');
        let results;

        button.addEventListener('click', () => {
            callback();
        })

        this.contain.appendChild(new Search(query => {

            amazon(query, (error, data) => {

                if (error) {
                    console.error(error.message);
                } else {

                    if (!results) {
                        results = new ResultsAmazon(data);
                        debugger
                        this.contain.appendChild(results.contain);
                    } else {
                        const _results = results;
                        results = new ResultsAmazon(data);
                        _results.contain.replaceWith(results.contain);
                    }
                }

            });

        }).contain);
    }
}