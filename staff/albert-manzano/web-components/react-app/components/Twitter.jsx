const { useState, useEffect ,Component} = React

function Twitter({ onTweets,onSubmit,tweets,token}) {


    const [view, setView] = useState('spinner')
    const [error, setError] = useState()
    const [success, setSucces] = useState()
    const [usersResults, setResults] = useState()
    const [usersQuery, setUsersQuery] = useState()

    useEffect(() => {
        try {
            !tweets && retrieveTweets(token, (error,tweets) => {
                if (error) throw error

                onTweets(tweets)

                const hash = location.hash.substring(1)

                location.hash = hash ? hash : 'tweets'

                setView(hash ? hash : 'tweets')
            }
            )
        } catch (error) {
            throw error
        }
    }, [])


    const goToView = (view) => {
        location.hash = view === 'twitter' || view === 'tweets' || view === 'tweet' ? view : ''

        setView(view)
    }

    const handleSubmit= function(event) {
        event.preventDefault()

        const message = event.target.tweet.value

        try {
            tweet(token, message, (error) => setSucces(success))
        } catch (error) {
            setError(error)
        }
    }

    const handleSearchUsersResultsAndQuery = (results, query) =>{
        setResults(results)
        setUsersQuery(query)
        // #q=
        const [hash,q]=location.hash.substring(1).split('?')
        hash = twitter
        q = query
        location.hash[hash,q]
    }

    const handleTwitter = event => {
        event.preventDefault()

        goToView( 'twitter')
    }

    const handleTweets = event => {
        event.preventDefault()

        goToView('tweets')
    }

    const handleTweet = event => {
        event.preventDefault()

        goToView('tweet')
    }



    return <section className="Twitter">
        <h2>Twitter</h2>
        <a className={`Twitter__link ${view === 'twitter' ? 'Twitter__link--active' : ''}`} href="" onClick={handleTwitter}>twitter </a>
        <a className={`Twitter__link ${view === 'tweets' ? 'Twitter__link--active' : ''}`} href="" onClick={handleTweets}>tweets </a>
        <a className={`Twitter__link ${view === 'tweet' ? 'Twitter__link--active' : ''}`} href="" onClick={handleTweet}>tweet </a>

        {view === 'twitter' && <Users onSearch={handleSearchUsersResultsAndQuery}
            token={token} users={usersResults} query={usersQuery} />}

        {view === 'tweets' && <Tweets tweets={tweets} handleToggle={handleTweet}
            token={token} />}

        {view === 'tweet' && <Tweet tweets={tweets} token={token} handleSubmit={onSubmit} />}

        {view === 'spinner' && <Spinner/>}
    </section>

}

