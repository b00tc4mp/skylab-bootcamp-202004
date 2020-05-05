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
        setUser({user})
    })
  }, [])

    function handleSearchUsers(query){
        searchUsers(props.token, query, (error, foundUsers) => {
            if(error) throw error
            setFoundUsers(foundUsers)
            setQuery(query)
            
    })}



    function handleFollow(followEmail){
        toggleFollowUser(props.token, followEmail, (error, email) => {
            if(error) throw error
            handleSearchUsers(query)
        })
    }


    function changeView(view){
        setView(view)
    }


        return <>
       { user && <section className="home">
        <h1>HOME: Welcome {user.name} </h1>


        <ul>
            <li onClick={()=> changeView('google')}>Google Search</li>
            <li onClick={()=> changeView('search')}>Search Users</li>
            <li onClick={()=> changeView('twitter')}>Twitter</li>
        </ul>


         {view === 'search' && (
             <>
             <Search onSubmit={handleSearchUsers} token={props.token}/>
             <UsersResults foundUsers={foundUsers} user={user} handleFollow={handleFollow} />
            </>
         )}

         {view === 'google' && <Google />}
         {view === 'twitter' && <Twitter token={props.token}/> }

        </section>}
        {!user && <p>LOADING...</p>}
    </>
}
