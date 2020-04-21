function Register(callback) {
  const temp = document.createElement("div");

  temp.innerHTML = `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
    <button class='login-btn'>Go to Register</button>
</section>`;

  const container = temp.firstChild;

  const loginBtn = container.querySelector(".login-btn");

  loginBtn.addEventListener("click", function () {
    register.replaceWith(login);
  });

  const form = container.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = event.target.name.value,
      surname = event.target.surname.value,
      email = event.target.email.value,
      password = event.target.password.value;

    callback(name, surname, email, password);
  });

  return container;
}
