
//         let feedback;

//         form.addEventListener('submit', event => {
//             event.preventDefault();

//             let email = event.target.email.value,
//                 password = event.target.password.value;

//             try {
//                 toSubmit(email, password);

//                 cleanUp();
//             } catch (error) {
//                 if (!feedback) {
//                     feedback = new Feedback(error.message, 'error');

//                     this.contain.appendChild(feedback.contain);
//                 } else feedback.innerText = error.message;
//             }
//         })

//         const cleanUp = () => {
//             form.email.value = ''
//             form.password.value = ''

//             if (feedback) {
//                 this.contain.removeChild(feedback.contain);
//                 feedback = undefined;
//             }
//         }

//         const register = this.contain.querySelector('a');

//         register.addEventListener('click', event => {
//             event.preventDefault();
//             toRegister();
//             cleanUp();
//         });
//     }
// }

function Login({onRegister}) {
    return <section className="login">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/30/gc/designs/livepreview/amazon_squidink_noto_email_v2016_es-main._CB462075794_.png" className="logo"></img>
        <h1 className="h1">Login</h1>
        <form>
            <p>Email Adress: <br /><input className="input" type="email" name="email" required /></p>
            <p>Password: <br /><input className="input" type="password" name="password" required /></p>
            <button className="button" onClick={ ()=>onSubmit()}>Login</button><br /> or <br /> <a href="" onClick={ event => {
            event.preventDefault();

            onRegister()
            }}>Register</a>
        </form>
    </section>
}