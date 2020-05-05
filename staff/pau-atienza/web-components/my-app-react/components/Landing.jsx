function Landing({setView}){
   
   return <section className="landing">
      <h1>Welcome</h1>
      <a href="" onClick = {(event) => {event.preventDefault(); setView('register')}}>Register</a> 
      or
      <a href="" onClick = {(event) => {event.preventDefault(); setView('login')}}> Login</a>
   </section>
}