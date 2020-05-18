const { useState, useEffect } = React

function Home(props) {

    
    const [tweet, setTweet] = useState(undefined)
    const [view, setView] = useState('spinner')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [userEmail, setUserEmail] = useState(undefined)
    const [following, setFollowing] = useState(undefined)

    useEffect(() => {
        const hash = location.hash.substring(1)

        location.hash = hash ? hash : 'user'

        setView(hash ? hash : 'user')

        retrieveUser(props.token, (error, { name, surname, email, following }) => {
            if (error) console.log(error)
            else {
                sessionStorage.token = props.token
                location.hash = ''
                setName(name)
                setSurname(surname)
                setUserEmail(email)
                setFollowing(following)
                setView('user')
            }
        })

    }, [])

    const goToView = view => {
        location.hash = view === 'user' || view === 'google' || view === 'twitter' ? view : ''

        setView(view)
    }


    function handleOnGoogle(event) {
        event.preventDefault()

        goToView('google')
    }

    function handleOnUsers(event) {
        event.preventDefault()

        goToView('user')
    }
    function handleRetriveTweets() {
        retrieveTweets(props.email, props.token, (error, tweets) => {
            if (error) console.log(error) //TODDO feedback
            else {
                goToView('twitter')
                setTweet(tweets)
            }
        })
    }


    function handleonTwitter(event) {
        event.preventDefault()
        handleRetriveTweets()
    }
    /*function handleonSport(event) {
        event.preventDefault()
        setCurrentLink('sport')
    }*/

    return <section className="home">
        <h1>Wellcome {`${name} ${surname}`}</h1>
        <button onClick={() => props.logOut('landing')}>Logout</button>
        <a onClick={handleOnUsers} className="home__link" href="">Users</a>
        <a onClick={handleOnGoogle} className="home__link" href="">Google</a>
        <a onClick={handleonTwitter} className="home__link" href="">Twitter</a>
        <a className="home__link" href="">Ecosia</a>
        {/* <a onClick={handleonSport} className="home__link" href="">Sport</a> */}
        {view === 'spinner' && <Spinner />}
        {view === 'user' && <Users token={props.token} following={props.following} />}
        {view === 'google' && <Google />}
        {view === 'ecosia' && <Ecosia />}
        {view === 'twitter' && <Twitter retrieveTweets={handleRetriveTweets} resultsTweet={tweet} token={props.token} name={props.name} />}
        {/* {currentLink === 'sport' && <Sport />} */}
    </section>
}

