const { useState, useEffect } = React

function Home(props){
    const [homeView, setHomeView] = useState('user')
    const [user, setUser] = useState(undefined)
    const [foundUsers, setFoundUsers] = useState(undefined)
    const [googleResults, setGoogleResults] = useState(undefined)
    const [latestTweet, setLatestTweet] = useState(undefined)

    useEffect(()=>{
        try{
            retrieveUser(props.token, (error, user) => {
                if(error) return props.setError(error.message)
                setUser(user)
                setLatestTweet(user.tweets[user.tweets.length-1])
            })
        }catch(error) {props.setError(error.message)}
      }, []
    )

    const handleSearchUsers = (event)=>{
        const query = event.target.query.value
        try{
            searchUser(props.token, query, (error, foundUsers) => {
                if(error) return props.setError(error.message)
                setFoundUsers(foundUsers)
            })
        }catch(error) {props.setError(error.message)}
    }

    const handleFollow = (followID) => {
        try{
            toggleFollowUser(props.token, followID, user.following, (error, email) => {
                if(error) return props.setError(error.message)
                
                retrieveUser(props.token, (error, user) => {
                    if(error) return props.setError(error.message)
                    setUser(user)
                })
            })
        }catch(error) {props.setError(error.message)}
    }

    const handleSearchGoogle = (query) => {
        try{
            googleSearch(query, (error, googleResults)=>{
                if(error) return props.setError(error.message)
                setGoogleResults(googleResults)
            })
        }catch(error) {props.setError(error.message)}
    }
    
    const handleTweet = (event) => {
        const text = event.target.tweet.value
        try{
            tweet(props.token, text, user.tweets, (error, latestTweet) => {
                if(error) return props.setError(error.message)
    
                retrieveUser(props.token, (error, user) => {
                    if(error) return props.setError(error.message)
                    setUser(user)
                    setLatestTweet(user.tweets[user.tweets.length-1])
                })
            })
        }catch(error) {props.setError(error.message)}
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