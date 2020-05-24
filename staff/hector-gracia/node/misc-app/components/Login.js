module.exports=()=>{
    return `<div class="login">
            <section class="login__container">
            <h1>Login</h1>
            <form>
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="e-mail">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
            <a href="/register">register</a>
            </form>
            </section>
        </div>`
}