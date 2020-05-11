const { useState, useEffect } = React

function Home({ token }) {

    const [view, setView] = useState()
    const [players, setPlayers] = useState()
    const [error, setError] = useState()
    const [emblem, setEmblem] = useState()
    // const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState()
    const [sportNews, setSportNews] = useState()
    const [fwitter,setFwitter] = useState();


    const handleGoToPlayerResults = (queryPlayer) => {
        try {
            searchPlayers(queryPlayer, (error, resultsPlayer) => {
                if (error) return setError(error.message)

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

    const handleGoToFwitter = () =>{
        try {
            retriveFwitter(token,(error,results)=>{
                if (error) return setError(error.message);
                setFwitter(results);
            })
            setView('fwitter');
        } catch ({message}) {
            setError(message)
        }  
    }

    return <>

        <Navbar onGoToPlayerResults={handleGoToPlayerResults} onGoToSportNews={handleGoToSport} onGoToFwitter={handleGoToFwitter}/>
        {/* {view === 'spinner' && <Spinner />} */}
        {view === 'cards' && <PlayerResults resultsPlayers={players} />}
        {view === 'sport' && <SportNews sportNews={sportNews}/>}
        {view === 'fwitter' && <Fwitter fwitter={fwitter}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}