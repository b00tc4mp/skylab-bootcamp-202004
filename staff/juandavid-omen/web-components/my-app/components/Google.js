class Google extends Component {
    constructor(onSubmit) {
        super(`<section class="google">
            <h2>Google</h2>
        </section>`)

    let results;
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

    };
};