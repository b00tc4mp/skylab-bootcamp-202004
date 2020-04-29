// class Home extends Component {
//   constructor(name, onLogout) {
//     super(`<section class="home-nav"><h1>Welcome ${name} !</h1> 
//         <a href="#">Users Search</a>
//         <a href="#">Google Search</a>
//         <a href="#">Eco Mode</a>
//         <button class="logout-button">Log out</button>
//         <section class="search-section"></section>
//         </section>`);

//     const logoutButton = this.container.querySelector(".logout-button");
//     const searchSection = this.container.querySelector(".search-section");
//     const navLinks = this.container.querySelectorAll("a");
//     const [userLink, googleLink, ecoLink] = navLinks;

//     userLink.addEventListener("click", () => {
//       event.preventDefault();
//       cleanSearchSection(userSearch);
//     });
//     googleLink.addEventListener("click", () => {
//       event.preventDefault();
//       cleanSearchSection(googleSearch);
//     });

//     ecoLink.addEventListener("click", () => {
//       event.preventDefault();
//       debugger;
//       cleanSearchSection(ecoSearch);
//     });

//     logoutButton.addEventListener("click", function () {
//       event.preventDefault();

//       onLogout();
//     });

//     // USERS
//     let listDisplayed = false;
//     const userSearch = new Search((request) => {
//       if (listDisplayed) cleanSearchSection(userSearch);

//       const usersFound = searchUsers(request);
//       const results = new usersResults(usersFound);
//       searchSection.append(results.container);
//       listDisplayed = true;
//     });

//     searchSection.appendChild(userSearch.container);

//     // GOOGLE
//     let googleDisplayed = false;
//     const googleSearch = new Search((request) => {
//       if (googleDisplayed) cleanSearchSection(googleSearch);

//       const _google = google(request, (results) => {
//         if (results.length) {
//           let _results = new googleResults(results);
//           searchSection.append(_results.container);
//           googleDisplayed = true;
//         }
//       });
//     });

//     // ECO 🌳
//     let ecoDisplayed = false;
//     const ecoSearch = new Search((request) => {
//       if (ecoDisplayed) cleanSearchSection(ecoSearch);

//       const _eco = eco(request, (results) => {
//         if (results.length) {
//           let _results = new ecoResults(results);
//           searchSection.append(_results.container);
//           ecoDisplayed = true;
//         } else console.error("no result");
//       });
//     });

//     function cleanSearchSection(replacement) {
//       searchSection.innerHTML = "";
//       searchSection.appendChild(replacement.container);
//     }
//   }
// }

const { Component } = React

class Home extends Component {
  constructor() {
    super()

    this.state = {
      search: 'users',
      results: false
    }
  }

  handleLogout = e => {
    e.preventDefault()

    this.props.onLogout()
  }

  usersSearch = e => {
    e.preventDefault()

    this.setState({ results: false })
    this.setState({ search: 'users' })
  }

  googleSearch = e => {
    e.preventDefault()

    this.setState({ results: false })
    this.setState({ search: 'google' })
  }

  handleQuery = (request) => {
    if (this.state.search === 'users') {
      const usersFound = searchUsers(request)

      usersFound.length ? this.setState({ results: usersFound })
        : this.setState({ results: 'no-results' })

    } else {
      google(request, (queryResults) => {
        queryResults.length ? this.setState({ results: queryResults })
          : this.setState({ results: 'no-results' })

      })

    }
  }

  render() {
    return <section className="home-nav"><h1>Welcome {this.props.name} !</h1>
      <a href="#" onClick={this.usersSearch}>Users Search</a>
      <a href="#" onClick={this.googleSearch}>Google Search</a>
      <button className="logout-button" onClick={this.handleLogout}>Log out</button>
      <Search query={this.handleQuery} />
      {this.state.results && this.state.search === 'users' && <UsersResults results={this.state.results} />}
      {this.state.results && this.state.search === 'google' && <GoogleResults results={this.state.results} />}
      {this.state.results === 'no-results' && <Feedback message='0 results found 🤡' error='warning' />}
    </section>
  }
}