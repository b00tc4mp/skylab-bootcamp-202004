module.exports = () => {
    return `<section class="register">
    <h1>Register</h1>
    <form action="/register" method="POST">
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
    <a href="/login">Login</a>
</section>`
}