function Landing({callback}){
   return <section className="landing">
      <h1>Welcome</h1>
      <a href="" onClick = {(event) => {
         event.preventDefault()
         callback('register')
      }}>Register</a> or
      <a href="" onClick = {(event) => {
         event.preventDefault()
         callback('login')
      }}> Login</a>
   </section>
}