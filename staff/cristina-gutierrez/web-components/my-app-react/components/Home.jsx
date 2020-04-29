

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




const { Component } = React

class Home extends Component {
    constructor(props) {
        super(props) 
        
        this.state = {
            view:'users'
        }
    }

    handleUsers = event => {
        event.preventDefault()
        
        this.setState({ view: "users" })
    }
    handleGoogle = event => {
        event.preventDefault()
    }

    render() {
        return <section className="home">
            <h1>Welcome, {this.props.name}!</h1>
            <a href="" onClick={event => {
                event.preventDefault()

                this.handleUsers('users')
            }}>Users </a>
            <a href="" onClick={event => {
                event.preventDefault()

                this.handleGoogle("google")
            }}>Google </a>
            <a href="" onClick={event => {
                event.preventDefault()

                this.handleHola('users')
            }}>Hola News </a>
            <button onClick={ event => {
                event.preventDefault()

                this.props.handleGoToLanding
            }}>Logout</button>
            {this.state.view === 'users' && <Users />}
            {this.state.view === 'google' && <Google />}
            {this.state.view === 'news' && <HolaNews />}
        </section>
    }
}