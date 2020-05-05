const { useState } = React

function Home(props) {

    const [currentLink, setCurrentLink] = useState('user')
    const [tweet, setTweet] = useState(undefined)

    function handleOnGoogle(event) {
        event.preventDefault()

        setCurrentLink('google')   
    }

    function handleOnUsers(event) {
        event.preventDefault()

        setCurrentLink('user')
    }

    function handleRetriveTweets()  {
        retrieveTweets(props.email, props.token, (error, tweets) => {
            if (error) console.log(error) //TODDO feedback
            else {
                setCurrentLink('twitter')
                setTweet(tweets)                    
            }
        })
    }


    function handleonTwitter(event) {
        event.preventDefault()
        handleRetriveTweets()
    }

 
        return <section className="home">
            <h1>Wellcome {`${props.name} ${props.surname}`}</h1>
            <button onClick={() => props.logOut('landing')}>Logout</button>
            <a onClick={handleOnUsers} className="home__link" href="">Users</a>
            <a onClick={handleOnGoogle} className="home__link" href="">Google</a>
            <a onClick={handleonTwitter} className="home__link" href="">Twitter</a>
            <a className="home__link" href="">Ecosia</a>
            <a className="home__link" href="">Sport</a>

            {currentLink === 'user' && <Users token={props.token} following={props.following} />}
            {currentLink === 'google' && <Google />}
            {currentLink === 'ecosia' && <Ecosia />}
            {currentLink === 'twitter' && <Twitter retrieveTweets={handleRetriveTweets} resultsTweet={tweet} token={props.token} name={props.name} />}
            {/* {this.state.currentLink === 'sport' && <Sport />} */}
        </section>
   
}

