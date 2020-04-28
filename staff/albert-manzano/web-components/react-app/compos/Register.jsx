// class Register extends Component {
//     constructor(toSubmit, toLogin) {

//         super(`<section class="register">
//             <h1>Register</h1>
//             <form>
//                 <p>Name: <br> <input type="text" name="name" required pattern="[A-Za-z]{1,20}"></p>
//                 <p>Surname: <br> <input type="text" name="surname" required pattern="[A-Za-z]{1,20}"></p>
//                 <p>Email Adress: <br>   <input type="email" name="email"required></p>
//                 <p>Password: <br><input type="password" name="password" required minLength="8"></p>
//                 <button class="button">Register</button> <br> or  <br> <a href="">Log-in</a>
//             </form>
//             </section>`);

//         const form = this.contain.querySelector('form');

//         let feedback;

//         form.addEventListener('submit', event => {
//             event.preventDefault()

//             const name = event.target.name.value,
//                 surname = event.target.surname.value,
//                 email = event.target.email.value,
//                 password = event.target.password.value

//             try {
//                 toSubmit(name, surname, email, password);

//                 cleanUp()
//             } catch (error) {
//                 if (!feedback) {
//                     cleanUp()
//                     feedback = new Feedback(error.message, 'error')
//                     this.contain.append(feedback.contain)
//                 } else{
//                     feedback.innerText = error.message;
//                 } 
//             }
//         })

//         const cleanUp = () => {
//             form.name.value = ''
//             form.surname.value = ''
//             form.email.value = ''
//             form.password.value = ''

//             if (feedback) {
//                 this.contain.removeChild(feedback.contain);

//                 feedback = undefined;
//             }
//         }

//         const login = this.contain.querySelector('a')

//         login.addEventListener('click', event => {
//             event.preventDefault();

//             toLogin();

//             cleanUp();
//         })

//     }
// }


function Register({onLogin}) {
    return <section className="register">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/30/gc/designs/livepreview/amazon_squidink_noto_email_v2016_es-main._CB462075794_.png" className="logo"></img>
        <h1 className="h1">Register</h1>
        <form>
            <p>Name:<br /><input className="input" type="text" name="name" required pattern="[A-Za-z]{1,20}" /></p>
            <p>Surname:<br /><input className="input" type="text" name="surname" required pattern="[A-Za-z]{1,20}" /></p>
            <p>E-mail:<br /><input className="input" type="email" name="email" required /></p>
            <p>Password:<br /><input className="input" type="password" name="password" required minLength="8" /></p>
            <button className="button" onClick={() => onSubmit()}>Submit</button>
            <br />or <br /><a href="" onClick={event => {
                event.preventDefault()

                onLogin()
            }}><br />Login</a>
        </form>
    </section>
}