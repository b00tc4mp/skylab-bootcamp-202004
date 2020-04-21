function Register(onSubmit, onLogin) {

    const temp = document.createElement('div');

    temp.innerHTML = `<section class="register"><h1>Register</h1>
    <form>
        <input type="text" name="name" minlength="4" maxlength="10" placeholder="name">
        <input type="text" name="surname" minlength="4" maxlength="10" placeholder="surname">
        <input type="email" name="email" minlength="4" maxlength="18" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        <a href="">Log in</a>
    </form><section>`

    const container = temp.firstChild;
    const form = container.querySelector('form');
    const login = container.querySelector('a');

    let feedback;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value

        try {

            onSubmit(name, surname, email, password);
            event.target.name.value = ''
            event.target.surname.value = ''
            event.target.email.value = ''
            event.target.password.value = ''

            if(feedback) container.removeChild(feedback)
        } catch (error){
            if(!feedback){
                feedback = Feedback (error.message,'error')
                container.appendChild(feedback)
            }else feedback.innerText = error.message

            event.target.name.value = '💩'
            event.target.surname.value = '💩'
            event.target.email.value = '💩'
            event.target.password.value = '💩'


        }
    });

    login.addEventListener('click', function (event) {
        event.preventDefault();

        onLogin();
    });

    return container;
};


// if (feedback) container.removeChild(feedback)
// } catch (error) {
//     if (!feedback) {
//         feedback = Feedback(error.message, 'error')

//         container.append(feedback)
//     } else feedback.innerText = error.message
// }