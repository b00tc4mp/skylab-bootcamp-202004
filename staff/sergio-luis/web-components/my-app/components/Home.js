class Home extends Component {
    constructor(name, callback) {
        super(`<main class='main'>
        <h1 class='main__title'>Welcome ${name}</h1>
        <button class="main__button">Exit</button>
    </main>`)


        const button = this.container.querySelector('button');

        button.addEventListener('click', function() {
            callback()
        })

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
        }).container)

        let searchResults;
        // const queryResult;
        this.container.appendChild(new SearchGoogle(query =>{
            const items = google(query, (error, results)=> {
                if (error) console.error('KO', error.message)
                else {
                    searchResults = new ResultsGoogle(results);
                    this.container.appendChild(searchResults.container);
                }
            });
            // try {
            //     search('hola mundo', function(error, results) {
            //         if (error) console.error('KO', error.message)
            //         else {
            //             console.log('OK', 'hola mundo =>', results)
            //         }
            //     })
            //     // do more stuff
            // } catch(error) {
            //     console.error('KO', error.message)
            // }

            if (!searchResults) {
                searchResults = new ResultsGoogle(items);
                this.container.appendChild(searchResults.container);
            } else {
                const _searchResults = searchResults;
                searchResults = new ResultsGoogle(items);
                _searchResults.container.replaceWith(searchResults.container);
            }
        }).container)
    }
}