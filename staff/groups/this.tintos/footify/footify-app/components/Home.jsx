const { useState, useEffect } = React

function Home({ token }) {

    const [view, setView] = useState('fwitter')
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    // const [loading, setLoading] = useState(true)
    const [likesUser, setLikesUser] = useState()
    const [userDetails, setUserDetails] = useState()
    const [sportNews, setSportNews] = useState()
    const [queryPlayer, setQueryPlayer] = useState()
    const [fwitter, setFwitter] = useState();


    useEffect(() => {
        try {
            //tratar de sacar los names con retrieve aqui
            retriveFwitter(token, (error, results) => {
                if (error) return setError(error.message);
                
                commentCards(results, token, (error, resultsComments) => {
                    if(error) return setError(error.message)
                    setFwitter(resultsComments)
                })
            })
            
            setView('fwitter')
        } catch ({ message }) {
            setError(message)
        }
    }, [])


    const handleGoToPlayerResults = (queryPlayer) => {

        retrieveUser(token, (error, user) => {
            setUserDetails(user)
            const { likes } = user
            setLikesUser(likes)
            
        })

        setQueryPlayer(queryPlayer)
        try {
            setPlayers(undefined)
            setError(undefined)

            searchPlayers(queryPlayer, (error, resultsPlayer) => {

                if (error) {
                    setPlayers('no players')
                    setError(error.message)
                }


                searchPlayersLikes(resultsPlayer, token, (error, resultLikes) => { 
                    if (error) return setError(error.message)
                    setPlayers(resultLikes) 
                    
                })


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

    const handleToggleFollowPlayers = () => {
        handleGoToPlayerResults(queryPlayer)
    }
    const handleCommentFwitt = () => {
        handleGoToPlayerResults(queryPlayer)
    }
   

    const handleGoToFwitter = () => {
        try {
            retriveFwitter(token, (error, results) => {
                if (error) return setError(error.message);
                
                
                commentCards(results, token, (error, resultsComments) => {
                    setFwitter(resultsComments)
                })
            })
            setView('fwitter');
        } catch ({ message }) {
            setError(message)
        }
    }
    const handleGoToDream = () => {
        setView('dream')
    }
  
    const handleGoToUpdateUser = () => {
        setView('update-user')
    }
    return <>

        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} onGoToFwitter={handleGoToFwitter} onGoToDream={handleGoToDream} onGoToUpdateUser={handleGoToUpdateUser}/>
        {/* {view === 'spinner' && <Spinner />} */}
        {view === 'cards' && <PlayerResults resultsPlayers={players} token={token} onToggleFollowPlayer={handleToggleFollowPlayers} onCommentFwitt={handleCommentFwitt} queryPlayer={queryPlayer} likesUser={likesUser} />}
        {view === 'sport' && <SportNews sportNews={sportNews} />}
        {view === 'fwitter' && <Fwitter fwitter={fwitter} token={token} onUpdateFwitter={handleGoToFwitter}/>}
        {view === 'dream' && <Dream />}
        {view === 'update-user' && <UpdateUser token={token} onGoToFwitter={handleGoToFwitter} userDetails={userDetails}/>}
        {error && <Feedback message={error} level="error" />}

    </>

}