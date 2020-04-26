// TODO show "Welcome, <name>!"
class Home extends Component {
  constructor(name, onLogout) {
    super(`<section class="home">
    <h1>Welcome, ${name}!</h1>
    <button id='logout'>Logout</button>
</section>`);

    let results;

    const searchComponent = new Search((query) => {
      const _users = searchUsers(query);

      if (!results) {
        results = new Results(_users);

        this.container.appendChild(results.container);
      } else {
        const _results = results;

        results = new Results(_users);

        _results.container.replaceWith(results.container);
      }
    });
    this.container.appendChild(searchComponent.container);

    let googleResults;

    const searchGoogle = new Google((query) => {
      google(query, (error, data) => {
        if (!googleResults) {
          googleResults = new GoogleResults(data);

          this.container.appendChild(googleResults.container);
        } else {
          const _googleResults = googleResults;

          googleResults = new GoogleResults(data);

          _googleResults.container.replaceWith(googleResults.container);
        }
      });
    });
    this.container.appendChild(searchGoogle.container);

    
    const searchBbc = new Bbc(() => {
      bbcNews((error, data) => {
        if (!BbcResults) {
          BbcResults = new Bbc(data);

          this.container.appendChild(BbcResult.container);
        } else {
          const _BbcResult= BbcResult;

          BbcResult = new Bbc(data);

          _BbcResult.container.replaceWith(BbcResult.container);
        }
      });
    });
    this.container.appendChild(searchBbc.container);

    const logout = this.container.querySelector("#logout");
    logout.addEventListener("click", function () {
      onLogout();
    });
  }
}
