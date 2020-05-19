const { useEffect, useState } = React

function Twitter({ useremail, token }) {

    const [tweets, setTweets] = useState(undefined)

    useEffect(() => {
        retrieveTweets(useremail, token, (error, tweetsArray) => {
            debugger
            if (error) console.log(error)
            setTweets(tweetsArray)
        })
    }, [])

    const handleTweet = (event) => {
        event.preventDefault()
        let { message } = event.target
        message = message.value
        tweet(this.props.token, message, (error) => {
            if (error) console.log(error)
        })
    }

    return <section className="twitter">
        <h2>Twitter</h2>
        <form onSubmit={handleTweet}>
            <input type="text" name="message" /> <button>Tweet</button>
        </form>
        {tweets && <ul>
            {tweets.map(({ name, surname, tweets }) =>
                <li>
                    <h2>{name} {surname}</h2>
                    {tweets.map(({ message, text, date }) => {
                        return <p>{message || text}  {date}</p>
                    })}
                </li>
            )}
        </ul>}
    </section>
}








