class Home extends Component {
  constructor(name, logOut) {
    super(`<section class="home">
    <h1>Welcome, ${name}!</h1>
    <a class="home__link" href="">Users</a>
    <a class="home__link" href="">Google</a>
    <a class="home__link" href="">Hola News</a>
    <button>Logout</button>
</section>`);

    const button = this.container.querySelector("button");

    button.addEventListener("click", () => {
      const users = new Results();
      const google = new Results.goo();

      let currentContainer = users;

      this.container.append(currentContainer.contaniner);

      const [userLink, googleLink] = this.container.querySelectorAll("a");

      let currentlink = userLink;

      currentlink.classList.toogle("home__link--active");

      googleLink.addEventListener("click", (event) => {
        event.preventDefault();

        currentContainer.container.replaceWith(google.container);
        currentlink.classList.toogle("home__link--active");

        currentContainer = google;
        currentlink = googleLink;
        currentlink.classList.toogle("home__link--active");
      });

      userLink.addEventListener("click", () => {
        event.preventDefault();

        currentContainer.container.replaceWith(users.container);
        currentlink.classList.toogle("home__link--active");

        currentContainer = users;
        currentlink = userLink;
        currentlink.classList.toogle("home__link--active");
      });
    });
  }
}
