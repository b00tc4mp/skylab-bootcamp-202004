const { useState, useEffect } = React

function Home({ token , onUserSessionExpired ,onGoToLogOut}) {

    const [view, setView] = useState('fwitter')
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [likesUser, setLikesUser] = useState()
    const [userDetails, setUserDetails] = useState()
    const [sportNews, setSportNews] = useState()
    const [queryPlayer, setQueryPlayer] = useState()
    const [fwitter, setFwitter] = useState();
    const [playersRanking, setPlayersRanking] = useState()
    



    useEffect(()=>{
        try {
            retriveFwitter(token, (error, results) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw setError(error.message);
                } else {
                    const arrfwitter = creatFwitterArray(results)
                    commentCards(arrfwitter, token, (error, resultsComments) => {
                        if(error){
                            if (error.message === 'invalid token')
                            onUserSessionExpired()
                            else throw setError(error.message);
                        }else{
                            setFwitter(resultsComments)
                            goToView('fwitter')
                        }
                    });    
                }
            });
        } catch (error) {
            setError(error.message);
        }
    },[]);
     

    const handleGoToPlayerResults = (queryPlayer) => {
        try {
            retrieveUser(token, (error, user) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw setError(error.message);
                } else {
                    setUserDetails(user)
                    const { likes } = user
    
                    setLikesUser(likes)
                    setQueryPlayer(queryPlayer)
                    setPlayers(undefined)
                    setError(undefined)

                    searchPlayers(queryPlayer, (error, resultsPlayer) => {
                        if (error) {
                            setPlayers('no players')
                            setError(error.message)
                        }else{
                            searchPlayersLikes(resultsPlayer, token, (error, resultLikes) => { 
                                if (error) {
                                    if (error.message === 'invalid token')
                                        onUserSessionExpired()
                                    else throw setError(error.message);
                                } else {
                                setPlayers(resultLikes) 
                                goToView('cards')

                                }
                            }) 
                        }  
                    })
                }
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToFwitter = () => {
        try {
            retriveFwitter(token, (error, results) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw setError(error.message);
                } else {
                    const arrfwitter = creatFwitterArray(results)
                    commentCards(arrfwitter, token, (error, resultsComments) => {
                        if (error) {
                            if (error.message === 'invalid token')
                                onUserSessionExpired();
                            else throw setError(error.message);
                        }else{
                            const hash = address.hash()
                            !hash && address.hash('fwitter')

                            setFwitter(resultsComments);
                            setView('fwitter');
                        }  
                    })
                }
            })
        }catch({message}){
            setError(message)
        }       
    }         


    const goToView = (view) => {
        address.hash(view === 'cards' || view === 'sport' || view === 'fwitter' || view === 'dream' || view === 'update-user' ? view : '')

        setView(view)
    }

    const handleGoToSport = () => {
        searchSport((listResults) => {
            setSportNews(listResults)
            goToView('sport')
        })
    }
   
    const handleGoToFwitter = () => {
        try {
            retriveFwitter(token, (error, results) => {
                if (error) return setError(error.message);
                const arrfwitter = creatFwitterArray(results)
                
                //TODO
                //const arrfwitter = creatFwitterArray(results)

                commentCards(arrfwitter, token, (error, resultsComments) => {
                    setFwitter(resultsComments)
                })
            })
            setView('fwitter');
        } catch ({ message }) {
            setError(message)
        }
    }
    const handleGoToDream = () => {
        dreamTeam(undefined,token,(error, playersRanking) =>{
            if(error) return setError(error)
            setPlayersRanking(playersRanking)
            setView('dream')
        })
       
       
    }
  
    const handleGoToUpdateUser = () => {
        setView('update-user')
    }


    return <>

        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} onGoToFwitter={handleGoToFwitter} onGoToDream={handleGoToDream} onGoToUpdateUser={handleGoToUpdateUser} onGoToLogOut={onGoToLogOut}/>
        {view === 'cards' && <PlayerResults resultsPlayers={players} token={token} onToggleFollowPlayer={handleToggleFollowPlayers} onCommentFwitt={handleCommentFwitt} queryPlayer={queryPlayer} likesUser={likesUser} onUserSessionExpired={onUserSessionExpired}/>}
        {view === 'sport' && <SportNews sportNews={sportNews} />}        
        {view === 'fwitter' && <Fwitter fwitter={fwitter} token={token} onUpdateFwitter={handleGoToFwitter} onUserSessionExpired={onUserSessionExpired} searchPlayer={handleGoToPlayerResults}/>}
        {view === 'dream' && <Dream  playersRanking={playersRanking}/>}
        {view === 'update-user' && <UpdateUser token={token} onGoToFwitter={handleGoToFwitter} userDetails={userDetails}  onUserSessionExpired={onUserSessionExpired}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}