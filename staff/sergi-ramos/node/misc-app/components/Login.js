module.exports = () => {

    return `<section class="login">
  <h1>Login</h1>
  <form action="/login" method="POST">
      <input type="email" name="email" placeholder="e-mail">
      <input type="password" name="password" placeholder="password">
      <button>Submit</button>
  </form>
  </section>`
  }
  