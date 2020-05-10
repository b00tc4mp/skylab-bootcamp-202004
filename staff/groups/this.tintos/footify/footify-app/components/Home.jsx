const { useState } = React

function Home({ token }) {

    const [view, setView] = useState()
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [emblem, setEmblem] = useState()
    const [likes, setLikes] = useState()
    const [sportNews, setSportNews] = useState()


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
    const handleGoToSport = () => {
        searchSport((listResults) => {

            setSportNews(listResults)
            setView('sport')

        })



    }

    return <>
        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} />

        {view === 'cards' && <PlayerResults resultsPlayers={players} resultLikes={likes} />}
        {view === 'sport' && <SportNews sportNews={sportNews}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}