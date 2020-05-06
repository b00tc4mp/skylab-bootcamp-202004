const { useState, useEffect } = React

function Home ({onLogout, token}) {
    
        const [view, setView] = useState ("home"),
        const [googleResults, setGoogleResult] = useState (),
        const [googleQuery, setGoogleQuery] = useState (),
        const [holaNews, setHolaNews] = useState (),
        const [userResults, setUserResults] = useState (),
        const [usersQuery, setUsersQuery] = useState (),
        const [tweets, setTweets] = useState (),
        const [following, setfollowing] = useState (),
        const [name, setName] = useState ()
       
        useEffect(() => {
            try {
                retrieveUser(token, (error, user) => {
                    if (error) throw error
    
                    setName (user.name)
                })
            } catch (error) {
                throw error
            }
        }, [])

    const handleUsers = event => {
        event.preventDefault()

        setView("users")
    }

    const handleGoogle = event => {
        event.preventDefault()

        setView("google")
    }

    const handleHolaNews = event => {
        event.preventDefault()

        setView("hola-news")
    }

    const handleTwitter = event => {
        event.preventDefault()

       setView("twitter")
    }
    
    const handleFollowing = event => {
        event.preventDefault()

        setView("following")
    }

    const handleSearchUsersResultsAndQuery = (results, query) => {
        setUserResults (results)
        setUsersQuery (query)
    }

    const handleSearchGoogleResultsAndQuery = (results, query) => {
        setGoogleResults (results)
        setGoogleQuery (query)
    }

    const handleRetrieveHolaNewsResults = news => {
        setHolaNews (news)
    }

    const handleRetrieveTwitterResults = tweets => {
        setTwitter (tweets)
    }

    return <section className="home">
        <h1>Welcome, {name}!</h1>
        <a className={`home__link ${view === 'users' ? 'home__link--active' : ''}`} href="" onClick={handleUsers}>Users </a>
        <a className={`home__link ${view === 'google' ? 'home__link--active' : ''}`} href="" onClick={handleGoogle}>Google </a>
        <a className={`home__link ${view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={handleHolaNews}>Hola News </a>
        <a className={`home__link ${view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={handleTwitter}>Twitter </a>
        <button onClick={onLogout}> Logout </button>

        {view === 'users' && <Users onSearch={this.handleSearchUsersResultsAndQuery} results={this.state.usersResults} query={this.state.usersQuery} token={this.props.token} />}
        {view === 'google' && <Google onSearch={this.handleSearchGoogleResultsAndQuery} results={this.state.googleResults} query={this.state.googleQuery} />}
        {view === 'hola-news' && <HolaNews onNews={this.handleRetrieveHolaNewsResults} news={this.state.holaNews} />}
        {view === 'twitter' && <Twitter onTweets={this.handleRetrieveTwitterResults} tweets={this.state.tweets} token={this.props.token} />}
    </section>
}

{view === 'google' && <Google onSearch={handleSearchGoogleResultsAndQuery} 
results={googleResults} query={googleQuery} />}

{view === 'hola-news' && <HolaNews onNews={handleRetrieveHolaNewsResults}
news={holaNews} />}

{view === 'twitter' && <Twitter onTweets={handleRetrieveTwitterResults} onFollowing={handleFollowing}
tweets={twitter} token={token} following={twitterFollowing} />}
