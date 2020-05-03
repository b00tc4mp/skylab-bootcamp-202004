function Landing({changeView}){
   
   return <section className="landing">
      <h1>Welcome</h1>
      <a href="" onClick = {(event) => {event.preventDefault(); changeView('register')}}>Register</a> 
      or
      <a href="" onClick = {(event) => {event.preventDefault(); changeView('login')}}> Login</a>
   </section>
}