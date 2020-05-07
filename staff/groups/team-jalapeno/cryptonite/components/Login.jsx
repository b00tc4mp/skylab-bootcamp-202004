

function Login({ loginSubmit, toRegister }) {

    return <section className="login">
        <h2 className="login__title">Login</h2>
        <form onSubmit={loginSubmit} className="login__form">
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        <p className="login__to-register">Don't have an account?<a href="" onClick={toRegister}>Register</a></p>
    </section>

}