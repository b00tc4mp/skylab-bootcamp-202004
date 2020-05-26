module.exports = (feedback) => `<section class="login">
<h1>Login</h1>
<form action="/login" method="POST">
<input type="email" name="email" placeholder="e-mail" required>
    <input type="password" name="password" placeholder="password" required>
    <button>Submit</button>
    or <a href="/register">Register</a>
</form>
${feedback?feedback:''}
</section>`