const {useState, useEffect} = React

function Following({goToUser, token}){
    const [errorFollowing, setErrorFollowing] = useState(undefined)
    const [following, setFollowing] = useState(undefined)

    const handleFollow = (user) =>{
        try{
            toggleFollowUser(token, user.id, error=>{
                if(error) return setErrorFollowing(error.message)
                retrieveUserFollowing(token, (error, userFollowing) =>{
                    if(error) return setErrorFollowing(error.message)
                    retrieveUsersById(token, userFollowing, (error, userFollowingInfo)=>{
                        if(error) return setErrorFollowing(error.message)
                        else setFollowing(userFollowingInfo)
                    })
                })
            })
        }catch(error){
            setErrorFollowing(error.message)
        }
    }

    useEffect(()=>{
        try{
            retrieveUserFollowing(token, (error, userFollowing) =>{
                if(error) return setErrorFollowing(error.message)
                retrieveUsersById(token, userFollowing, (error, userFollowingInfo)=>{
                    if(error) return setErrorFollowing(error.message)
                    else setFollowing(userFollowingInfo)
                })
            })
        } catch (error) {
            if (error) {
                setErrorFollowing(error.message)
                setFollowing([])
            }
        }
    },[])

    return <section className="userresults">
    {errorFollowing && following && !following.length && <Feedback message= {errorFollowing} level = "warning"/>}
    {!errorFollowing && !following && <Loading/>} 
    <ul className="userresults__cards">
        {following && following.map(user => <li key = {user.email}>{<UserCard user = {user} handleFollow = {handleFollow} goToUser = {goToUser}/>}</li>)}
    </ul>
  </section>;
  
}