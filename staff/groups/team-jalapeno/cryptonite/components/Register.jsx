const { useState } = React

function Register({goToLogin}){
    const [error, setError] = useState(null)

  const handleRegister = (event) => {
    event.preventDefault();
    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password },
    } = event.target;

    register(name, surname, email, password, (_error) => {
        if(_error) return setError(_error.message)
        goToLogin()
    });
  };

  // TODO create component for alerts

  return (
    <section className="register">
      <h2 className="register__title">Register</h2>
      <form onSubmit={handleRegister} className="register__form">
        <input name="name" type="text" placeholder="Name" />
        <input name="surname" type="text" placeholder="Surname" />
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Create account</button>
      </form>
      <p className="register__to-login">
        Already registered?<a href="#">Login</a>
      </p>
    {error && <p style={{color: 'crimson'}}>{error}</p>}
    </section>
  );
}
