  function Landing({onRegister, onLogin}) {debugger
      return < section className="landing">
          <a href="" onClick= { event => {debugger
              event.preventDefault()
               
              onRegister("register")
          }}>Register</a> or <a href ="" 
          onClick = {event => {debugger
              event.preventDefault()
               
              onLogin("login")
          }}>Login</a>
      </section>
  
    }
