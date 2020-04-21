function Login(onSubmit,onRegister) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="e-mail">
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
            <button>Register</button>
        </form>
    </section>`

    const container = temp.firstChild
    const form = container.querySelector('form')
    const register=container.querySelectorAll("button")[1];
    let feedback;

    form.addEventListener('submit', function (event) {
        event.preventDefault()
        debugger
        const email = event.target.email.value,
            password = event.target.password.value

        try{
            onSubmit(email, password)
            event.target.email.value="";
            event.target.password.value="";
        }catch(error){
            if(!feedback){
                feedback= Feedback(error.message,"error");
                container.appendChild(feedback);
            }else{
                feedback.innerText=error.message;
            }
        }
    });
    register.addEventListener("click",function(event){
        event.preventDefault();
        onRegister();
        form.email.value="";
        form.password.value="";
    })
    return container
}