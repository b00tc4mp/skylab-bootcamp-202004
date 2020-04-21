function Register(onSubmit, onLogin) {
  const temp = document.createElement('div')

  temp.innerHTML = `<section class="register">
  <h1>Register</h1>
  <form>
      <input type="text" name="name" placeholder="name">
      <input type="text" name="surname" placeholder="surname">
      <input type="email" name="email" placeholder="e-mail">
      <input type="password" name="password" placeholder="password">
      <button>Submit</button>
      or <a href="">Login</a>
  </form>
</section>`

  const container = temp.firstChild

  const form = container.querySelector('form')

  let feedback

  form.addEventListener('submit', function (event) {
      event.preventDefault()

      const name = event.target.name.value,
          surname = event.target.surname.value,
          email = event.target.email.value,
          password = event.target.password.value

  try{
      onSubmit(name, surname, email, password)
      
      event.target.name.value = '';
      event.target.surname.value = '';
      event.target.email.value = '';
      event.target.password.value = '';

  }catch(error) {
      if(!feedback) {
          feedback= Feedback(error.message, 'error')

          container.append(feedback)
      }else{
          feedback.innerText = error.message
      }
  }
          
  })

  const login = container.querySelector('a')

  login.addEventListener('click', function(event) {
      event.preventDefault()

      onLogin()
  })

  return container
}