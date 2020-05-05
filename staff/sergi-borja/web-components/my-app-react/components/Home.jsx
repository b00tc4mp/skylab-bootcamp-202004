const { useState, useEffect } = React

function Home({token, onLogout}) {

const [user, setUser] = useState({name: '', email: ''})
const [view, setView] = useState('users')

    componentDidMount() {
        try {
            retrieveUser(token, (error, user) => {
                if (error) throw error

                setUser({ name: user.name, email: user.email })
            })
        } catch (error) {
            throw error
        }
    }

    const handleUsers = event => {
        event.preventDefault()

        setView('users')
    }

    const handleGoogle = event => {
        event.preventDefault()

        setView('google')
    }

    const handleHolaNews = event => {
        event.preventDefault()

        setView('hola-news')
    }

    const handleTwitter = event => {
        event.preventDefault()

        setView('twitter')
    }

    const handleSearchUsersResultsAndQuery = (results, query) =>
        this.setState({ usersResults: results, usersQuery: query })

    const handleSearchGoogleResultsAndQuery = (results, query) =>
        this.setState({ googleResults: results, googleQuery: query })

    const handleRetrieveHolaNewsResults = news =>
        this.setState({ holaNews: news })

    
        return <section className="home">
            <h1>Welcome, {user.name}!</h1>
            <a className={`home__link ${view === 'users' ? 'home__link--active' : ''}`} href="" onClick={handleUsers}>Users </a>
            <a className={`home__link ${view === 'google' ? 'home__link--active' : ''}`} href="" onClick={handleGoogle}>Google </a>
            <a className={`home__link ${view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={handleHolaNews}>Hola News </a>
            <a className={`home__link ${view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={handleTwitter}>Twitter </a>
            <button onClick={onLogout}>Logout</button>

            {view === 'users' && <Users onSearch={handleSearchUsersResultsAndQuery} users={usersResults} query={usersQuery} token={token} />}
            {view === 'google' && <Google onSearch={handleSearchGoogleResultsAndQuery} results={googleResults} query={googleQuery} />}
            {view === 'hola-news' && <HolaNews onNews={handleRetrieveHolaNewsResults} news={holaNews} />}
            {view === 'twitter' && <Twitter getToken={token} />}
        </section>
    
}