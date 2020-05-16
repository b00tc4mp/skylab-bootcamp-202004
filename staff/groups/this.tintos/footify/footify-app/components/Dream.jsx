function Dream({ playersRanking ,searchPlayer}) {

    playersRanking = playersRanking.sort(function (a, b) {

        return a.posRanking - b.posRanking
    })

    const handleSearchPlayer = (name) =>{
        searchPlayer(name)
    }
    
    return <>

        <section className="dream-team">

            <h1 className="dream-team__title">Top 11</h1>
            {playersRanking ?

                <ul className="dream-team__list">

                    {playersRanking.map(({ strPlayer, strCutout, posRanking, likes, idPlayer }) =>
                        <a key={idPlayer} href='' onClick={(event)=>{
                            event.preventDefault()
                            handleSearchPlayer(strPlayer)
                        }}><li className="dream-team__row">
                            <div className="dream-team__info">
                                <h1 className="dream-team__info-pos">{posRanking}</h1>
                                <h2 className="dream-team__info-name">{strPlayer}</h2>
                            </div>
                            <div className="dream-team__likes-container">
                                <img className="dream-team__likes-container-image" src="img/heart_onclick.svg" alt="image-new" />
                                <h2 className="dream-team__likes-container-num">{likes}</h2>
                            </div>
                            <img className="dream-team__image" src={`${strCutout}`} alt="image-new" />

                        </li></a>
                    )}
                    <p className="dream-team__message">according to user votes</p>
                </ul>

                :
                <Feedback message="sorry, no results :(" level="warning" />
            }

        </section>
    </>
}

