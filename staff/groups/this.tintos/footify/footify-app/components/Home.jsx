const { useState } = React

function Home() {

    const [view, setView] = useState(undefined)
    const [players, setPlayers] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [emblem, setEmblem] = useState(undefined)



    const handleGoToPlayerResults = (queryPlayer) => {
        try {
            searchPlayers(queryPlayer, (error, resultsPlayer) => {
                if (error) return SetError(error.message)
                setPlayers(resultsPlayer)
                //*****

                setView('cards')

            })
          

        } catch ({ message }) {
            setError(message)
        }
    }

        return <>
            <Navbar onGoToPlayerResults={handleGoToPlayerResults} />

            {view === 'cards' && <PlayerResults resultsPlayers={players} emblem={emblem} />}
            {error && <Feedback message={error} level="error" />}
        </>

    }