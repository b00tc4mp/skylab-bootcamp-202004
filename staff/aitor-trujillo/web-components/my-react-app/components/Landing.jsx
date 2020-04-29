function Landing({ toRegister, toLogin }) {

  return <section className="landing">
    <h1>Already member? Are you new? </h1>
    <a href="" onClick={event => {
      event.preventDefault()
      toLogin()
    }}>Login</a> or
      <a href="" onClick={event => {
      event.preventDefault()
      toRegister()
    }}>Register</a>
  </section>

}
