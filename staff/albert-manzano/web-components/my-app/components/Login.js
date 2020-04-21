function Login(onSubmit,onRegister,) {
    let feedback
    const temp = document.createElement('div');

    temp.innerHTML = `<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        <a href="">Register</a>
    </form>
</section>`

    const container = temp.firstChild;
    const form = container.querySelector('form');
    const register = container.querySelector('a');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = event.target.email.value,
            password = event.target.password.value

        try{
        onSubmit( email, password);

        event.target.email.value= '';
        event.target.password.value= '';

        if (feedback) container.removeChild(feedback)
    }catch (error){
        if (!feedback){
            feedback = Feedback(error.message, 'error')
            container.appendChild(feedback)
        } else feedback.innertext=error.message

        event.target.email.value= '💩';
        event.target.password.value= '💩';
    }
    });

    register.addEventListener('click', function (event) {
        event.preventDefault();

        onRegister();
    });

    return container;
};