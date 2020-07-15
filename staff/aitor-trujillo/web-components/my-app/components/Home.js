class Home extends Component {
  constructor(name, onLogout) {
    super(`<section class="home-nav"><h1>Welcome ${name} !</h1> 
        <a href="#">Users Search</a>
        <a href="#">Google Search</a>
        <a href="#">Eco Mode</a>
        <button class="logout-button">Log out</button>
        <section class="search-section"></section>
        </section>`);

    const logoutButton = this.container.querySelector(".logout-button");
    const searchSection = this.container.querySelector(".search-section");
    const navLinks = this.container.querySelectorAll("a");
    const [userLink, googleLink, ecoLink] = navLinks;

    userLink.addEventListener("click", () => {
      event.preventDefault();
      cleanSearchSection(userSearch);
    });
    googleLink.addEventListener("click", () => {
      event.preventDefault();
      cleanSearchSection(googleSearch);
    });

    ecoLink.addEventListener("click", () => {
      event.preventDefault();
      debugger;
      cleanSearchSection(ecoSearch);
    });

    logoutButton.addEventListener("click", function () {
      event.preventDefault();

      onLogout();
    });

    // USERS
    let listDisplayed = false;
    const userSearch = new Search((request) => {
      if (listDisplayed) cleanSearchSection(userSearch);

      const usersFound = searchUsers(request);
      const results = new usersResults(usersFound);
      searchSection.append(results.container);
      listDisplayed = true;
    });

    searchSection.appendChild(userSearch.container);

    // GOOGLE
    let googleDisplayed = false;
    const googleSearch = new Search((request) => {
      if (googleDisplayed) cleanSearchSection(googleSearch);

      const _google = google(request, (results) => {
        if (results.length) {
          let _results = new googleResults(results);
          searchSection.append(_results.container);
          googleDisplayed = true;
        }
      });
    });

    // ECO 🌳
    let ecoDisplayed = false;
    const ecoSearch = new Search((request) => {
      if (ecoDisplayed) cleanSearchSection(ecoSearch);

      const _eco = eco(request, (results) => {
        if (results.length) {
          let _results = new ecoResults(results);
          searchSection.append(_results.container);
          ecoDisplayed = true;
        } else console.error("no result");
      });
    });

    function cleanSearchSection(replacement) {
      searchSection.innerHTML = "";
      searchSection.appendChild(replacement.container);
    }
  }
}
