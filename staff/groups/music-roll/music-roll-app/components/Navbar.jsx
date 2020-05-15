const { useState } = React

function Navbar({ onChangeView }) {
    const [token, setToken] = useState(undefined)
    const [view, setView] = useState('home')

    // <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : ''}`} href="" onClick={this.handleUsers}>Users </a>
    
    useEffect(() => {debugger
        if (sessionStorage.token)
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuth) => {
                    if (error) throw error

                    if (isAuth) {
                        setToken(sessionStorage.token)
                        setView('home')
                    } else setHashView('login')
                })
            } catch (error) {
                if (error) throw error
            }
      /*   else {
            const hash = location.hash.substring(1)

            if (hash === 'login' || hash === 'register') setHashView(hash)
            else {
                location.hash = ''
                
                setView('landing')
            }
        } */
    }, [])
    
    const setHashView = view => {
        location.hash = view
        setView(view)
    }
    return <nav className="navbar">
        <ul className="navbar__list">
            <li className={`navbar__item ${view === 'home' ? 'navbar__item--active left' : ''}`}>
                <a href="" onClick={event => {
                    event.preventDefault()

                    setHashView('home')
                    onChangeView('home')
                }}><i className="fas fa-home"></i></a>

            </li>
            <li className={`navbar__item ${view === 'browser' ? 'navbar__item--active center' : ''}`}>
                <a href="" onClick={event => {
                    event.preventDefault()
                    setHashView('browser')
                    onChangeView('browser')
                }}><i className="fas fa-music"></i></a>
            </li>
            <li className={`navbar__item ${view === 'favorites' ? 'navbar__item--active center' : ''}`}>
                <a href="" onClick={event => {
                    event.preventDefault()

                    setHashView('favorites')
                    onChangeView('favorites')
                }}><i className="far fa-heart"></i></a>
            </li>
            <li className="navbar__item">
                <a href="" onClick={event => {
                    event.preventDefault()
                    delete sessionStorage.token

                    setHashView('login')
                    onChangeView('login')
                }}><i className="fas fa-sign-out-alt"></i></a>
            </li>
        </ul>
    </nav>



}

