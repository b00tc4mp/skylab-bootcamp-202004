class Register extends Component {
  constructor (checkRegister, callback) {
  super(`<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}>
        <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}>
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required pattern="[A-Za-z0-9]{1,20}>
        <button>Submit</button>
        or <a href="">Login</a>
    </form>
    <p class="feedback feedback--success"></p>
</section>`)

    const form = container.querySelector('form')

    let feedback

    form.addEventListener('submit', event => {
        event.preventDefault()

        let {name, surname, email, password} = event.target
            name = name.value,
            surname = surname.value,
            email = email.value,
            password = password.value

    try {
      checkRegister(name, surname, email, password);

        cleanUp();
    } catch (error) {
      if (!feedback) {
        feedback = new Feedback(error.message, "success");

        this.container.append(feedback.container);
      } else feedback.innerHTML = error.message;
    }        
    })

      const cleanUp = () => {
        name.value = '';
        surname.value = '';
        email.value = '';
        password.value = '';

        if(feedback) {
          this.container.removeChild(feedback.container)

          feedback = undefined
        }
    }

    const login = this.container.querySelector('a')

    login.addEventListener('click', event => {
      event.preventDefault()

      onLogin()

      cleanUp()

    })

  }
}