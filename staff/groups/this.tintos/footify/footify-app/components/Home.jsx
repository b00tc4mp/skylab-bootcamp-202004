const { useState, useEffect } = React

function Home({ token }) {

    const [view, setView] = useState()
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [emblem, setEmblem] = useState()
    // const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState()
    const [sportNews, setSportNews] = useState()


    const handleGoToPlayerResults = (queryPlayer) => {
        try {
            searchPlayers(queryPlayer, (error, resultsPlayer) => {
                if (error) return SetError(error.message)

                searchPlayersLikes(resultsPlayer, token, (error, resultLikes) => {
                    if (error) return SetError(error.message)
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

    return <>

        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} />
        {/* {view === 'spinner' && <Spinner />} */}
        {view === 'cards' && <PlayerResults resultsPlayers={players} />}
        {view === 'sport' && <SportNews sportNews={sportNews}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}