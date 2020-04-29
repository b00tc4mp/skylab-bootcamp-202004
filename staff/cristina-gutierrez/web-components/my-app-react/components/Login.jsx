function Login() {
    return <section className="login">
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required />
            <button>Submit</button>
             or <a href="">Register</a>
        </form>
    </section>
}