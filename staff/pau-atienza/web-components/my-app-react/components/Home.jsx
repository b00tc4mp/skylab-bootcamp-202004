const { useState, useEffect } = React

function Home(props){
    const [homeView, setHomeView] = useState('user')
    const [user, setUser] = useState(undefined)
    const [foundUsers, setFoundUsers] = useState(undefined)
    const [googleResults, setGoogleResults] = useState(undefined)
    const [latestTweet, setLatestTweet] = useState(undefined)

    useEffect(()=>{
        retrieveUser(props.token, (error, user) => {
            if(error) return props.setError(error.message)
            setUser(user)
            setLatestTweet(user.tweets[user.tweets.length-1])
        })
      }, []
    )

    const handleSearchUsers = (event)=>{
        let query = event.target.query.value

        searchUser(props.token, query, (error, foundUsers) => {
            if(error) return props.setError(error.message)
            setFoundUsers(foundUsers)
        })
    }

    const handleFollow = (followID) => {
        toggleFollowUser(props.token, followID, user.following, (error, email) => {
            if(error) return props.setError(error.message)
            
            retrieveUser(props.token, (error, user) => {
                if(error) return props.setError(error.message)
                setUser(user)
            })
        })
    }

    const handleSearchGoogle = (query) => {
        googleSearch(query, (error, googleResults)=>{
            if(error) return props.setError(error.message)
            setGoogleResults(googleResults)
        })
    }
    
    const handleTweet = (event) => {
        let text = event.target.tweet.value
        tweet(props.token, text, user.tweets, (error, latestTweet) => {
            if(error) return props.setError(error.message)

            retrieveUser(props.token, (error, user) => {
                if(error) return props.setError(error.message)
                setUser(user)
                setLatestTweet(user.tweets[user.tweets.length-1])
            })
        })
    }

    return <>
        {<NavBar setHomeView = {setHomeView} name = {user && user.name}/>}
        {(homeView === 'user') &&
        <>
            <UserSearch handleSearchUsers = {handleSearchUsers}/> 
            <UserResult foundUsers={foundUsers} user={user} handleFollow={handleFollow}/>
        </>}
        {homeView === 'google' && <GoogleSearch handleSearchGoogle = {handleSearchGoogle} googleResults = {googleResults}/>}
        {homeView === 'twitter' && <Twitter token={props.token} handleTweet = {handleTweet} tweet={latestTweet} user = {user}/>}
    </>
}