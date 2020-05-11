const { useState, useEffect } = React

function Home({ token }) {

    const [view, setView] = useState()
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [emblem, setEmblem] = useState()
    // const [loading, setLoading] = useState(true)
    const [likesUser, setLikesUser] = useState()
    const [sportNews, setSportNews] = useState()
    const [queryPlayer, setQueryPlayer] = useState()
    

    const handleGoToPlayerResults = (queryPlayer) => {
        
        retrieveUser(token, (error, user) =>{
            const {likes} = user
            setLikesUser(likes)
          })

        setQueryPlayer(queryPlayer)
        try {

            searchPlayers(queryPlayer, (error, resultsPlayer) => {
                if (error) return setError(error.message)

                searchPlayersLikes(resultsPlayer, token, (error, resultLikes) => {
                    if (error) return setError(error.message)
                    setPlayers(resultLikes)
                    
                })

                // isPlayerfollowed(token, playerId, (error, followPlayer) => {
                //     if (error) return setError(error.message)
                //     setFollow(followPlayer)
                // })   

                setView('cards')
            })
        } catch ({ message }) {
            setError(message)
        }
    }
    const handleGoToSport = () => {
        searchSport((listResults) => {

            setSportNews(listResults)
            setView('sport')

        })
    }

    const handleToggleFollowPlayers = () =>{
        handleGoToPlayerResults(queryPlayer)
    }

    return <>

        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} />
        {/* {view === 'spinner' && <Spinner />} */}
        {view === 'cards' && <PlayerResults resultsPlayers={players} token={token} onToggleFollowPlayer={handleToggleFollowPlayers} queryPlayer={queryPlayer} likesUser={likesUser}/>}
        {view === 'sport' && <SportNews sportNews={sportNews}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}