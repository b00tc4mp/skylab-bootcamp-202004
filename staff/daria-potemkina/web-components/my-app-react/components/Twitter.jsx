const { useState, useEffect } = React

function Twitter({ token }) {

    const [error, setError] = useState()
    const [tweets, setTweets] = useState()

    useEffect(() => {
        try {
            retrieveTweets(token, (error, allTweets) => {
                debugger
                if (error) throw error
                setTweets(allTweets)

            })
        } catch (error) {
            throw error
        }
    }, [])

    const handleSubmitTweet = tweets => {
        try {
            tweet(token, tweets, error => {
                if (error) setError(error.message)
                else {
                    try {
                        retrieveTweets(token, (error, allTweets) => {
                            if (error) throw error

                            setTweets(allTweets)
                        })
                    } catch (error) {
                        throw error
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }


    return <section className="twitter">
        <h2>Twitter</h2>
        <Tweet token={token} onSubmitTweet={handleSubmitTweet} />
        {tweets && <Tweets allTweets={tweets} />}
    </section>

}