// class Landing extends Component {
//     constructor(onRegister, onLogin) {
//         super(`<section class="landing">
//     <a href="" class="signin">Register</a> <p class="or">or</p> <a href="" class="submit">Login</a>
// </section>`)

//         // const anchors = container.querySelectorAll('a')
//         // const register = anchors[0]
//         // const login = anchors[1]

//         const [register, login] = this.container.querySelectorAll('a')

//         register.addEventListener('click', function (event) {
//             event.preventDefault()

//             onRegister()
//         })

//         login.addEventListener('click', function (event) {
//             event.preventDefault()
//             onLogin()
//         })
//     }
// }

function Landing({callback}) {
    return <section className="landing">
        <a href="" className="signin" onClick={event => {event.preventDefault(); callback('register')}}>Register</a> <p className="or">or</p> <a href="" className="submit" onClick={event => {event.preventDefault(); callback('login')}}>Login</a>
    </section>




}