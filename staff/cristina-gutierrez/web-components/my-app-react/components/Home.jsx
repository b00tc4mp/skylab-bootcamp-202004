// class Home extends Component {
//     constructor(name, onLogout) {
//         super(`<section class="home">
//     <h1>Welcome, ${name}!</h1>
//     <a class="home__link" href="">Users</a>
//     <a class="home__link" href="">Google</a>
//     <a class="home__link" href="">Hola News</a>
//     <button>Logout</button>
// </section>`)

//         const button = this.container.querySelector('button')

//         button.addEventListener('click', () => onLogout())

//         const users = new Users()
//         const google = new Google()
//         const holaNews = new HolaNews()

//         let currentBody = users

//         this.container.append(currentBody.container)

//         const [usersLink, googleLink, holaNewsLink] = this.container.querySelectorAll('a')

//         let currentLink = usersLink

//         currentLink.classList.toggle('home__link--active')

//         googleLink.addEventListener('click', event => {
//             event.preventDefault()

//             currentBody.container.replaceWith(google.container)
//             currentLink.classList.toggle('home__link--active')

//             currentBody = google
//             currentLink = googleLink
//             currentLink.classList.toggle('home__link--active')
//         })

//         usersLink.addEventListener('click', event => {
//             event.preventDefault()

//             currentBody.container.replaceWith(users.container)
//             currentLink.classList.toggle('home__link--active')

//             currentBody = users

//             currentLink = usersLink
//             currentLink.classList.toggle('home__link--active')
//         })

//         holaNewsLink.addEventListener('click', event => {
//             event.preventDefault()

//             currentBody.container.replaceWith(holaNews.container)
//             currentLink.classList.toggle('home__link--active')

//             currentBody = holaNews

//             currentLink = holaNewsLink
//             currentLink.classList.toggle('home__link--active')
//         })
//     }
// }

class Home extends Component {
    constructor(props) {
        super(props) 
        
        this.state = {
            current:'users'
        }   
    }

    displayView = view => {this.setState({ current:view })}

    render() {
        return <section className="home">
            <h1>Welcome, {name}!</h1>
            <a className="home__link" href="" onClick={event => {
                event.preventDefault()

                this.displayView('users')
            }}>Users</a>
            <a className="home__link" href="" onClick={event => {
                event.preventDefault()

                this.displayView("google")
            }}>Google</a>
            <a className="home__link" href="" onClick={event => {
                event.preventDefault()

                this.displayView('users')
            }}>Hola News</a>
            <button onClick={ event => {
                event.preventDefault()

                this.props.handleGoToLanding
            }}>Logout</button>
            {this.state.current === 'users' && <Users />}
            {this.state.current === 'google' && <Google />}
            {this.state.current === 'news' && <HolaNews />}
        </section>
    }
}