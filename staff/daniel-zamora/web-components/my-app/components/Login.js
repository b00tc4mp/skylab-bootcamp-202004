class Login extends Component {
  constructor(checkLogin, inRegister) {
    super(`<section class="login">  
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
</section>`)

    const form = container.querySelector("form");

    let feedback;

    const self = this;

    form.addEventListener("submit", function (event) {
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

          self.container.append(feedback.container);
        } else feedback.innerHTML = error.message;
      }
    });

    function cleanUp() {
      form.email.value = "";
      form.password.value = "";

      if (feedback) {
        self.container.removeChild(feedback.container);

        feedback = undefined;
      }
    }

    const register = container.querySelector("a");

    register.addEventListener("click", function (event) {
      event.preventDefault();
      inRegister();

      cleanUp;
    });
  }
}
