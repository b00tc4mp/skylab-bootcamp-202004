const { useState } = React

function Home({token}) {

    const [view, setView] = useState()
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [emblem, setEmblem] = useState()
    const [likes,setLikes] = useState()


    const handleGoToPlayerResults = (queryPlayer) => {
        try {
            searchPlayers(queryPlayer, (error, resultsPlayer) => {
                if (error) return SetError(error.message)
                
                setPlayers(resultsPlayer)
                
                searchPlayersLikes(resultsPlayer, token, (error, resultLikes) => {
                    if (error) return SetError(error.message)

                    setLikes(resultLikes)
                })
               
                setView('cards')

            })


        } catch ({ message }) {
            setError(message)
        }
    }

    return <>
        <Navbar onGoToPlayerResults={handleGoToPlayerResults} />

        {view === 'cards' && <PlayerResults resultsPlayers={players} resultLikes={likes}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}