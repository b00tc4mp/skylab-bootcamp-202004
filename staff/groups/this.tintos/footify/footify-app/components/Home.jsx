const { useState, useEffect } = React

function Home({token}) {

    const [view, setView] = useState()
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [emblem, setEmblem] = useState()
    const [likes,setLikes] = useState()
    // const [loading, setLoading] = useState(true)

    const handleGoToPlayerResults = (queryPlayer) => {
        try {
            searchPlayers(queryPlayer, (error, resultsPlayer) => {
                if (error) return SetError(error.message)
                
                
                
                searchPlayersLikes(resultsPlayer, token, (error, resultsPlayers) => {
                    if (error) return SetError(error.message)
                    setPlayers(resultsPlayer)
                    
                })
               
                setView('cards')

            })


        } catch ({ message }) {
            setError(message)
        }
    }

    return <>
        <Navbar onGoToPlayerResults={handleGoToPlayerResults} />
        {/* {view === 'spinner' && <Spinner />} */}
        {view === 'cards' && <PlayerResults resultsPlayers={players}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}