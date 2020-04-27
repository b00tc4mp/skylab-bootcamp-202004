// class Landing extends Component{
//     constructor(goRegister, goLogin) {
//         super(`<section class="landing">
//                 <h1>Welcome</h1>
//                 <a href="" >Register</a>
//                 <a href="" >Login</a>
//             </section>`)
//         const [register, login] = this.container.querySelectorAll('a')
        
//         register.addEventListener('click',event=> {
//             event.preventDefault()
//             goRegister()
//         })
//         login.addEventListener('click', event=> {
//             event.preventDefault()
//             goLogin()
//         })
    
//     }
// }

function Landing({callback}){
    return <section className="landing">
                     <h1>Welcome</h1>
                     <a href="" onClick = {(event) => {
                        event.preventDefault()
                        callback('register')
                     }}>Register</a> or
                     <a href="" onClick = {(event) => {
                        event.preventDefault()
                        callback('login')
                     }}> Login</a>
                 </section>
}