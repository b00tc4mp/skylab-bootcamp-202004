/* const { useState, Component } = React;

function App() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [useremail, setUseremail] = useState(undefined);

  function handleGoToRegisterOrLoging(view) {
    setView(view);
  }

  function handleRegister(name, surname, email, password) {
    registerUser(name, surname, email, password, () => {});

    setView("login");
    setUser(name);
  }

  function handleLogin(email, password) {
    debugger;
    loginUser(email, password, (error, token) => {
      if (error) console.log(error);
      setToken(token);
      setUseremail(email);
      setView("home");
    });
  }

  return (
    <>
      {view === "landing" && (
        <Landing
          onRegister={handleGoToRegisterOrLoging}
          onLogin={handleGoToRegisterOrLogin}
        />
      )}
      {view === "register" && <Register onRegister1={handleRegister} />}
      {view === "login" && <Login onLogin1={handleLogin} />}
      {view === "home" && (<Home user={user}useremail={useremail}
          token={token}
        />
      )}
    </>
  );
} */


const { useState,Component } = React;

function App() {debugger
   const [view, setView] = useState('load')
   
   const [useremail, setUseremail] = useState(undefined)
   const [token, setToken] = useState(undefined)


   useEffect(()=> {
     if (sessionStorage.token)
     try{
       isUserAuthenticated(sessionStorage.token, (error,isAuthenticated) => {
         if(error) throw error

         if(isAuthenticated){
           setToken(sessionStorage.token)
           setView('home')
         }else setHashview('login')
       })
     }catch (error) {
       if (error) throw error
     }
    else {
      const hash = location.hash.substring(1)
      if(hash === 'login' || hash === 'register') setHashView(hash)
      else{
        location.hash = ''
        setView('landing')
      }
    
    }
   }, [])
  
   const setHashView = view => {
     location.hash = view
     setView(view)
   }
  
  const handleGoToRegister = () => setHashView('register')


  function handleRegister(name, surname, email, password) {
    registerUser(name, surname, email, password, () => {});

    setHashView('login');
    
  };

  function handleLogin (email, password){
    debugger;
    loginUser(email, password, (error, token) => {
      if (error) console.log(error)
      sessionStorage.taken = token
      setToken(token)
      setUseremail(email)
      setView('home')

    const handleGotoLogin = () => setHashView('login')

    const handleLogout = () => {
      setToken()
      delete sessionStorage.token
      location.hash=''
      setView('landing')
    }
      const handleUserSessionExpired = () => setHashView('login')
     
    });
  };
 
    return <>
        {view === 'load' && <Spinner />}    
        {view === "landing" && (<Landing onRegister={handleGoToRegister} onGoToLogin={handleGoToLogin}/>)}
        {view === "register" && (<Register onRegister1={handleRegister} onGoToLogin = {handleGoToLogin} />)}
        {view === "login" && <Login onLogin1={handleLogin} onGoToRegister = {handleGoToRegister} />}
        {view === "home" && <Home useremail={useremail} token={token} onLogout={handleLogout} onUserSessionExpired={handleUserSessionExpired} />}
      </>

}
