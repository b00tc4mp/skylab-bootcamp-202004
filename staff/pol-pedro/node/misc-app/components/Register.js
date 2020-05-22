module.exports = () => {
    return `<div class="register">
    <section class="register__container">
        <h1>Register</h1>
        <form action="/register" method="post">
            <label for="name">First name</label>
            <input type="text" name="name" placeholder="name">
            <label for="surname">Second name</label>
            <input type="text" name="surname" placeholder="surname">
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="e-mail">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
            <a href="/login">login</a>
        </form>
    </section>
    </div>`
}