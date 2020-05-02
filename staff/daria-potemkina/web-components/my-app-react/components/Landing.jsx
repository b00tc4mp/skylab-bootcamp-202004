function Landing ({ onLogin, onRegister }){
    return <section className='landing'>
    <h1>Already member? Are you new? </h1>
    <a href="" onClick = { event  => {
        event.preventDefault ()

        onLogin()
    }}>Login</a> or <a href="" onClick = { event => {
        event.preventDefault ()

        onRegister()
    }}>Register</a>
</section>
}