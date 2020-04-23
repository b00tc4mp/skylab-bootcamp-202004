class Home extends Component {
  constructor(name, onLogout) {
    super(`<section class="home">
              <h1>Welcome ${name} !</h1>
          <button>Log out</button>
      </section>`);

    const button = this.container.querySelector("button");

    button.addEventListener("click", function () {
      event.preventDefault();

      onLogout();
    });

    let listDisplayed = false;

    const search = new Search((request) => {
      if (listDisplayed) this.container.removeChild(this.container.lastChild);

      const usersFound = searchUsers(request);
      const results = new Results(usersFound);
      this.container.append(results.container);
      listDisplayed = true;
    });

    this.container.append(search.container);
  }
}
