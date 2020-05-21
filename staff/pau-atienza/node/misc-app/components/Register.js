module.exports = () => `<section class = "register">
    <h2>Register</h2>
<form action="/register" method="POST">
    Username: <input type="text" name="username" required placeholder = "Username">
    E-mail: <input type="email" name="email" required placeholder = "e-mail">
    Password: <input type="password" name="password" minLength = "8" required placeholder = "password">
    <button>Submit</button> or <a href = "/login">Login</a>
</form>
</section>`
