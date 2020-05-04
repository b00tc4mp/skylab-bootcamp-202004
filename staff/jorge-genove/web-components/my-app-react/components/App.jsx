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
   const [view, setView] = useState('landing')
   
   const [useremail, setUseremail] = useState(undefined)
   const [token, setToken] = useState(undefined)

  
  function handleView(view){setView(view)};


  function handleRegister(name, surname, email, password) {
    registerUser(name, surname, email, password, () => {});

    handleView('login');
    
  };

  function handleLogin (email, password){
    debugger;
    loginUser(email, password, (error, token) => {
      if (error) console.log(error)
      setView('home')
      setToken(token)
      setUseremail(email)
      
      
     
    });
  };
 
    return <>
        {view === "landing" && (<Landing onRegister={handleView} onLogin={handleView}/>)}
        {view === "register" && (<Register onRegister1={handleRegister} onLogin = {handleView} />)}
        {view === "login" && <Login onLogin1={handleLogin} onRegister = {handleView} />}
        {view === "home" && (<Home useremail={useremail} token={token} user={user}/>)}
      </>

}
