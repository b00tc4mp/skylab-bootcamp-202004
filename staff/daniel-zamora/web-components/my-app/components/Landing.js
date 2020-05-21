class Landing extends Component {
  constructor(onRegister, onLogin) {
    super(`<section class="landing">
    <a href="">Register</a> or <a href="">Login</a>
    </section>`);

    const [register, login] = this.container.querySelectorAll("a");

    register.addEventListener("click", function (event) {
      event.preventDefault();
      onRegister();
    });

    login.addEventListener("click", function (event) {
      event.preventDefault();
      onLogin();
    });
  }
}
