module.exports = () => `<section class="register">
<h1>Register</h1>
<form action='/register' method='POST'>
    <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}">
    <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}">
    <input type="email" name="email" placeholder="e-mail" required>
    <input type="password" name="password" placeholder="password" required minLength="6">
    <button>Submit</button>
    or <a href="/login">Login</a>
</form>
</section>`