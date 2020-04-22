function Login(onSubmit) {

    const template = document.createElement('div');

    template.innerHTML = `<section class="login">
    <h2 class='login__title'>LOGIN</h2>
    <form action="" class="login__form">
        <input class="login__input" type="email" name='email' placeholder="E-Mail">
        <p></p>
        <input class="login__input" type="password" name='password' placeholder="Password">
        <p></p>
        <button class='login__button'>On Submit</button>
    </form>
</section>`;

    const container = template.firstChild;

    const form = container.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        onSubmit(email,password);
    })




    return container
}
