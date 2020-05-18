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
    const [email, setEmail] = useState()
    
    useEffect(()=>{
        try {
            retrieveUser(token, (error, user) => {

                const {email, name, surname } = user
                setEmail(email)
                setUserDetails({name, surname})
                
       
            retriveFwitter(token, (error, results) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else  setError(error.message);
                } else {
                    const arrfwitter = creatFwitterArray(results)
                
                    commentCards(email, arrfwitter, token, (error, resultsComments) => {
                        if(error){
                            if (error.message === 'invalid token')
                            onUserSessionExpired()
                            else  setError(error.message);
                        }else{
                            setFwitter(resultsComments)
                            goToView('fwitter')
                        }
                    });    
                }
            });
        })

      
                
            
          
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
                    else  setError(error.message);
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
                                    else  setError(error.message);
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
                    else  setError(error.message);
                } else {
                    const arrfwitter = creatFwitterArray(results)
                    commentCards(email, arrfwitter, token, (error, resultsComments) => {
                        if (error) {
                            if (error.message === 'invalid token')
                                onUserSessionExpired();
                            else  setError(error.message);
                        }else{
                            const hash = address.hash()
                            !hash && address.hash('fwitter')

                            setFwitter(resultsComments);
                            goToView('fwitter');
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
        searchSport((error, listResults) => {
            if(error) setError(error)
            setSportNews(listResults)
            goToView('sport')
            
        })
    }
   
    const handleGoToDream = () => {
        dreamTeam(token,(error, playersRanking) =>{
            if (error) {
                if (error.message === 'invalid token')
                    onUserSessionExpired()
                else  setError(error.message);
            } else {
            

            setPlayersRanking(playersRanking)
            goToView('dream')

         } })

       
       
    }
  

    const handleGoToUpdateUser = () => {goToView('update-user') }

    const handleToggleFollowPlayers = () =>  { handleGoToPlayerResults(queryPlayer)}
    
    const handleCommentFwitt = () => {handleGoToPlayerResults(queryPlayer)}

    return <>

        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} onGoToFwitter={handleGoToFwitter} onGoToDream={handleGoToDream} onGoToUpdateUser={handleGoToUpdateUser} onGoToLogOut={onGoToLogOut}/>
        {view === 'cards' && <PlayerResults resultsPlayers={players} token={token} onToggleFollowPlayer={handleToggleFollowPlayers} onCommentFwitt={handleCommentFwitt} queryPlayer={queryPlayer} likesUser={likesUser} onUserSessionExpired={onUserSessionExpired} error={error}/>}
        {view === 'sport' && <SportNews sportNews={sportNews} />}        
        {view === 'fwitter' && <Fwitter fwitter={fwitter} token={token} onUpdateFwitter={handleGoToFwitter} onUserSessionExpired={onUserSessionExpired} searchPlayer={handleGoToPlayerResults}/>}
        {view === 'dream' && <Dream  playersRanking={playersRanking} searchPlayer={handleGoToPlayerResults}/>}
        {view === 'update-user' && <UpdateUser token={token} onGoToFwitter={handleGoToFwitter} userDetails={userDetails}  onUserSessionExpired={onUserSessionExpired}/>}
        {error && <Feedback message={error} level="login" />}
    </>

}