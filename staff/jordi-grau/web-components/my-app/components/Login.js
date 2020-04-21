function Login(checkLogin, inRegister) {
    const temp = document.createElement("div");
  
    temp.innerHTML = `<section class="login">
      <h1>Login</h1>
      <form>
          <input type="email" name="email" placeholder="e-mail">
          <input type="password" name="password" placeholder="password">
          <button>Submit</button>
      </form>
  </section>`;
  
    const container = temp.firstChild;
  
    const form = container.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const email = event.target.email.value,
        password = event.target.password.value;
  
      let feedback;
  
      try {
        checkLogin(email, password);
        event.target.email.value = "";
        event.target.password.value = "";
  
        if (feedback) container.removeChild(feedback);
      } catch (error) {
        if (!feedback) {
          feedback = Feedback(error.message, "error");
  
          container.append(feedback);
        } else feedback.innerHTML = error.message;
      }
    });
  
    const register = container.querySelector("a");
  
    register.addEventListener("click", function (event) {
  
      inRegister();
  
    });
  
    return container;
  }