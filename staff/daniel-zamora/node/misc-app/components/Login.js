module.exports = ()=>{
    return `<section class="login">
    <h1>Login</h1>
    <form acttion="/home" method="POST">
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required minLength="8">
        <button>Submit</button>
        or <a href="/register">Register</a>
    </form>
    <p class="feedback feedback--error">Wrong credentials</p>
</section>`
}