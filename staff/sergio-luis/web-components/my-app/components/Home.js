class Home extends Component {
    constructor(name, callback) {
        super(`<main class='main'>
        <nav class='navbar'>
            <h3 class='navbar__title'>Welcome ${name}</h3>
            <button class="navbar__button">LogOut</button>
        <nav>
    </main>`)


        const button = this.container.querySelector('button');

        button.addEventListener('click', function() {
            callback()
        })

        let searchResults;

        this.container.appendChild(new Search(query => {
            const users = searchUsers(query);

            if (!searchResults) {
                searchResults = new Results(users);
                this.container.appendChild(searchResults.container);
            } else {
                const _searchResults = searchResults;
                searchResults = new Results(users);
                _searchResults.container.replaceWith(searchResults.container);
            }
        }).container)

  
        this.container.appendChild(new SearchGoogle(query =>{
            const items = google(query, (error, results)=> {
                if (error) throw new Error('Error Search')
                else {
                    if (!searchResults) {
                        searchResults = new ResultsGoogle(results);
                        this.container.appendChild(searchResults.container);
                    } else {
                        const _searchResults = searchResults;
                        searchResults = new ResultsGoogle(results);
                        _searchResults.container.replaceWith(searchResults.container);
                    }
                }
            });
        }).container)
  
        this.container.appendChild(new SearchEcosia(query =>{
            const items = ecosia(query, (error, results)=> {
                if (error) console.error('KO', error.message)
                else {
                    if (!searchResults) {
                        searchResults = new ResultsEcosia(results);
                        this.container.appendChild(searchResults.container);
                    } else {
                        const _searchResults = searchResults;
                        searchResults = new ResultsEcosia(results);
                        _searchResults.container.replaceWith(searchResults.container);
                    }
                }
            });
        }).container)

        this.container.appendChild(new SearchNews(() =>{
            const items = news((error, results)=> {
                if (error) console.error(error.message)
                else {
                    if (!searchResults) {
                        searchResults = new ResultsNews(results);
                        this.container.appendChild(searchResults.container);
                    } else {
                        const _searchResults = searchResults;
                        searchResults = new ResultsNews(results);
                        _searchResults.container.replaceWith(searchResults.container);
                    }
                }
            });
        }).container)
    }
}