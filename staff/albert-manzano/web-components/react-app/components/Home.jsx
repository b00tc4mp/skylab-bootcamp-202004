const { useState, useEffect } = React

function Home ({onLogout,token}) {

    const[view,setView] = useState ('home')
    const[googleResults, setGoogleResult] = useState ()
    const[googleQuery, setGoogleQuery] = useState ()
    const[holaNews, setHolaNews] = useState ()
    const[twitter, setTwitter] = useState ()
    const[twitterFollowing, setTwitterFollowing] = useState ()
    const[name,setName] = useState ()
    
    useEffect(()=>{
        try {
            retrieveUser(token, (error, user) => {
                if (error) throw error

                setName (user.name) 
            })
        } catch (error) {
            throw error 
        }
    },[])
    
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

    
        return <section className="home">
            <h1>Welcome Son of a bitch, {name}!</h1>
            <a className={`home__link ${view === 'google' ? 'home__link--active' : ''}`} href="" onClick={handleGoogle}>Google </a>
            <a className={`home__link ${view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={handleHolaNews}>Hola News </a>
            <a className={`home__link ${view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={handleTwitter}>Twitter </a>
            <button onClick={onLogout}>Logout</button>

            

            {view === 'google' && <Google onSearch={handleSearchGoogleResultsAndQuery} 
            results={googleResults} query={googleQuery} />}
            
            {view === 'hola-news' && <HolaNews onNews={handleRetrieveHolaNewsResults}
            news={holaNews} />}
            
            {view === 'twitter' && <Twitter onTweets={handleRetrieveTwitterResults} onFollowing={handleFollowing}
            tweets={twitter} token={token} following={twitterFollowing} />}
            
        </section>
    
}