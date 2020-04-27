class HomeGoo extends Component {
    constructor(onLogout) {
      super(`<section class="home">
            <button>Log out</button>
        </section>`);
  
      const button = this.container.querySelector("button");
  
      button.addEventListener("click", function () {
        event.preventDefault();
  
        onLogout();
      });
  
      let listDisplayed = false;
  
      const search = new SearchGoo((request) => {
        if (listDisplayed) this.container.removeChild(this.container.lastChild);
  
        google(request, function (usersFound) {
          const results = new ResultsGoo(usersFound);
          this.container.append(results.container);
        });
  
        listDisplayed = true;
      });
  
      this.container.append(search.container);
    }
}