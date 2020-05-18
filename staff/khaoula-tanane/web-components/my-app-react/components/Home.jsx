const { useState, useEffect } = React

function Home(props) {
  const [view, setView] = useState('search')
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [foundUsers, setFoundUsers] = useState([])
  const [query, setQuery] = useState()

  useEffect(() => {
    retrieveUser(props.token, (error, user) => {
        if (error) return setError(error)
        setUser(user)
    })
  }, [])

    function handleSearchUsers(query){
        searchUsers(props.token, query, (error, foundUsers) => {
            if(error) throw error
            setFoundUsers(foundUsers)
            setQuery(query)
            
    })}


    function handleFollow(followEmail){

        try {
            toggleFollowUser(props.token, followEmail, error => {
                if (error){
                    if (error.message === 'invalid'){
                        props.onUserSessionExpired()
                    } else throw error
                } else handleSearchUsers(query)
            })
        } catch (error){
            if (error) throw error
        }
    }

    const setHashView = view => {
        location.hash = view
        setView(view)
      }


        return <>
       { user && <section className="home">
        <h1>HOME: Welcome {user.name} </h1>


        <ul>
            <li onClick={()=> setHashView('google')}>Google Search</li>
            <li onClick={()=> setHashView('search')}>Search Users</li>
            <li onClick={()=> setHashView('twitter')}>Twitter</li>
        </ul>


         {view === 'search' && (
             <>
             <Search onSubmit={handleSearchUsers} token={props.token}/>
             <UsersResults foundUsers={foundUsers} user={user} handleFollow={handleFollow} />
            </>
         )}

         {view === 'google' && <Google />}
         {view === 'twitter' && <Twitter token={props.token}/> }

         <button onClick={props.handleLogout}>Logout</button>
        </section>}
        {!user && <p>LOADING...</p>}
    </>
}
