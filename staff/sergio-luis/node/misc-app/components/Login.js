module.exports = feedback => {
    return `<section class="login">
    <h1>Login</h1>
    <form method='POST' action='/login'>
    <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required>
        <button>Submit</button>
        or <a href="/register">Register</a>
    </form>
    ${feedback ? feedback : ''}
</section>`
}