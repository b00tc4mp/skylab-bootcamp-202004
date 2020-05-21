class Login extends Component {
  constructor(checkLogin, inRegister) {
    super(`<section class="login">
    <h1>Login</h1>
    <form>
    <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required>
        <button>Submit</button>
        or <a href="">Register</a>
    </form>
</section>`)

    const form = this.container.querySelector("form");

    let feedback;

    form.addEventListener("submit", event => {
      event.preventDefault();

      let { email, password } = event.target;

      email = email.value;
      password = password.value;

      try {
        checkLogin(email, password);

        cleanUp();
      } catch (error) {
        if (!feedback) {
          feedback = new Feedback(error.message, "error");

          this.container.append(feedback.container);
        } else feedback.innerHTML = error.message;
      }
    })

    const cleanUp = () => {
      form.email.value = "";
      form.password.value = "";

      if (feedback) {
        this.container.removeChild(feedback.container);

        feedback = undefined;
      }
    }

    const register = this.container.querySelector("a")

    register.addEventListener("click", function (event) {
      event.preventDefault();
      inRegister();

      cleanUp();
    });
  }
}
