const {useState, useEffect} = React

function UserResults({userConditions, goToUser, token}){
    const [errorUserResults, setErrorUserResults] = useState(undefined)
    const [userResults, setUserResults] = useState([])

    const handleFollow = (user) =>{
        try{
            toggleFollowUser(token, user.id, error=>{
                if(error) setErrorUserResults(error.message)
                searchUsers(token, userConditions,(error, userSearchResults) =>{
                    if(error) setErrorUserResults(error.message)
                    else if (userSearchResults && (userSearchResults.length === 1)) goToUser(userSearchResults[0])
                    else setUserResults(userSearchResults)
                })
            })
        }catch(error){
            setErrorUserResults(error.message)
        }
    }

    useEffect(()=>{
        try{
            searchUsers(token, userConditions,(error, userSearchResults) =>{
                if(error) setErrorUserResults(error.message)
                else if (userSearchResults && (userSearchResults.length === 1)) goToUser(userSearchResults[0])
                else setUserResults(userSearchResults)
            })
        } catch (error) {
            if (error) {
                setErrorUserResults(error.message)
                setUserResults([])
            }
        }
    },[userConditions])

    return <section className="userresults">
    {/* <article className="userresults__info"></article> */}
    {errorUserResults && !userResults.length && <Feedback message= {errorUserResults} level = "warning"/>}
    <ul className="userresults__cards">
        {userResults && userResults.map(user => <li key = {user.email}>{<UserCard user = {user} handleFollow = {handleFollow} goToUser = {goToUser}/>}</li>)}
    </ul>
  </section>;
  
}