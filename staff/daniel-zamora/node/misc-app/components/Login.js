module.exports = () => `<section class = "login">
    <h2>Login</h2>
<form action="/login" method="POST">
    E-mail: <input type="email" name="email" required placeholder = "e-mail">
    Password: <input type="password" name="password" minLength = "8" required placeholder = "password">
    <button>Submit</button> or <a href = "/register">Register</a>
</form>
</section>`
