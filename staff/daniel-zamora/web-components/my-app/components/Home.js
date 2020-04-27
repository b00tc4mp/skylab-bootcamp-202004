class Home extends Component {
  constructor(name, callback) {
    super(`<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
    </section>`);

    const button = this.container.querySelector("button");

    button.addEventListener("click", function () {
      callback();
    });

    let results;

    this.container.appendChild(
      new Search((query) => {
        const users = searchUsers(query);
        if (!results) {
          results = new Results(users);
          this.container.appendChild(results.container);
        } else {
          const _results = results;
          results = new Results(users);
          _results.container.replaceWith(results.container);
        }
      }).container
    );

    let googleResults;

    this.container.appendChild(new SearchGoo((query) => {
        google(query, webs => {
          if (!googleResults) {
            googleResults = new ResultsGoo(webs).container;

            this.container.appendChild(googleResults);
          } else {
            const _googleResults = googleResults;
            googleResults = new ResultsGoo(webs).container;
            _googleResults.container.replaceWith(googleResutls.container);
          }
        });
      }).container
    );
  }
}
