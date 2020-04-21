function Landing() {
  const temp = document.createElement("div");

  temp.innerHTML = `<section class="landing">
     <button>Register</button>
        <button>Login</button>
    </section>`;

  const container = temp.firstChild;

  const buttonLanding = container.querySelectorAll("button");

  buttonLanding[0].addEventListener("click", function () {
    landing.replaceWith(register);
  });
  buttonLanding[1].addEventListener("click", function () {
    landing.replaceWith(login);
  });

  return container;
}
