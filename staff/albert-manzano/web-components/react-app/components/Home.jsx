const { useState, useEffect } = React

function Home ({onLogout, token, toUserSessionExpired}) {

    const[view,setView] = useState ('home')
    const[googleResults, setGoogleResult] = useState ()
    const[googleQuery, setGoogleQuery] = useState ()
    const[holaNews, setHolaNews] = useState ()
    const[tweets, setTwitter] = useState ()
    const[twitterFollowing, setTwitterFollowing] = useState ()
    const[name,setName] = useState ()
    
    useEffect(()=>{
        try {
            retrieveUser(token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash= hash ? hash : 'users'
                
                setName (user.name) 

                setView(hash ? hash : 'users')
            })
        } catch (error) {
            throw error 
        }
    },[])
    

    const goToView =(view) =>{
        location.hash = view === 'twitter' || view === 'google' || view === 'hola-news' ? view : ''

       setView( view )
    }

    const handleGoogle = event => {
        event.preventDefault()

        goToView('google')
    }

    const handleHolaNews = event => {
        event.preventDefault()

        goToView('hola-news')
    }

    const handleTwitter = event => {
        event.preventDefault()
        
        goToView('twitter')
    }

    const handleFollowing = following =>
        setTwitterFollowing( following)

    const handleSearchGoogleResultsAndQuery = (results, query) =>{
        setGoogleResult( results)
        setGoogleQuery( query )
    }

    const handleRetrieveHolaNewsResults = news =>
        setHolaNews(news)

    const handleRetrieveTwitterResults = tweets =>
        setTwitter( tweets)
        
    

    const onUserSessionExpired = () => toUserSessionExpired
    
        return <section className="home">
            <h1>Welcome Son of a bitch, {name}!</h1>
            <a className={`home__link ${view === 'google' ? 'home__link--active' : ''}`} href="" onClick={handleGoogle}>Google </a>
            <a className={`home__link ${view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={handleHolaNews}>Hola News </a>
            <a className={`home__link ${view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={handleTwitter}>Twitter </a>
            <button onClick={onLogout}>Logout</button>

            {view === 'load' && <Spinner />}

            {view === 'google' && <Google onSearch={handleSearchGoogleResultsAndQuery} 
            results={googleResults} query={googleQuery} onUserSessionExpired={onUserSessionExpired}/>}
            
            {view === 'hola-news' && <HolaNews onNews={handleRetrieveHolaNewsResults}
            news={holaNews} onUserSessionExpired={onUserSessionExpired}/>}
            
            {view === 'twitter' && <Twitter onTweets={handleRetrieveTwitterResults} onFollowing={handleFollowing}
            tweets={tweets} token={token} following={twitterFollowing} onUserSessionExpired={onUserSessionExpired}/>}
            
        </section>
    
}