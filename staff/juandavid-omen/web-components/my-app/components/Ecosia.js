class Ecosia extends Component {
    constructor(error, data) {
        super(`<section class="users">
            <form>
                <h2>Ecosia</h2>
            </form>
        </section>`);

        let results;
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
    };
};
