
const { useState } = React;

function PlayerResults({ resultsPlayers, token, onToggleFollowPlayer, onCommentFwitt, queryPlayer, likesUser, onUserSessionExpired, searchSubmit }) {

    const [error, setError] = useState()

    useEffect(() => {
        address.hash.query(queryPlayer)
    }, [])

    const handleToggleplayer = (playerId) => {

        try {
            toogleFollowPlayer(token, playerId, (error) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw setError(error.message);
                } else onToggleFollowPlayer(queryPlayer);

            });
        } catch (error) {
            setError(error.message);
        }
    }

    const handleCommentFwitt = (id, firstName, surname, comment) => {

        try {

            addFwitter(id, `${firstName} ${surname}`, comment, token, (error) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw setError(error.message);
                } else onCommentFwitt(queryPlayer)

            })
        } catch (error) {
            if (error) throw setError(error.message);
        }
    }

    if (!resultsPlayers) return <Spinner />;
    return <>
        <section className="player">
            {resultsPlayers !== 'no players' ? (
                <ul className="player-card">
                    {resultsPlayers.map(({ id, firstName, surname, club, number, image, clubName, born, date, likes }) => (
                        <li key={id} className="player-card__item">
                            <div className="player-card__player">
                                <div className="player-card__emblem">
                                    <img src={club} alt="team badge" />
                                </div>
                                <div className="player-card__number">
                                    <span>{number}</span>
                                </div>
                                <div className="player-card__image">
                                    <img src={image} alt="player" />
                                </div>
                                <h2 className="player-card__name-first">{firstName}</h2>
                                <h2 className="player-card__name-surname">{surname}</h2>
                            </div>
                            <hr className="player-card__line" />
                            <div className="player-card__info">
                                <h3 className="player-card__team"> Team:{" "} <span > {clubName}</span></h3>
                                <h3 className="player-card__country">Country:{" "}<span >{born}</span></h3>
                                <h3 className="player-card__birth">Date of birth:{" "}<span >{date}</span></h3>
                                <a className="player-card__like" onClick={(event) => {
                                    event.preventDefault();
                                    handleToggleplayer(id);
                                }}>
                                    {!likesUser.includes(id) ? <img src="img/heart.svg" alt="" /> : <img src="img/heart_onclick.svg" alt="" />}
                                </a>
                                <h4 className="player-card__count">{likes}</h4>
                            </div>
                            <hr className="player-card__small-line" />

                            <div className="player-card__comment">
                                <form type="text" className="player-card__form" onSubmit={(event) => {
                                    event.preventDefault()
                                    let { comment } = event.target
                                    comment = comment.value
                                    handleCommentFwitt(id, firstName, surname, comment);
                                }}>

                                    <input name="comment" placeholder="Say something..." className="player-card__form-input" maxLength="60" />
                                    <button className="player-card__form-button"> Send</button>


                                </form>
                            </div>
                        </li>
                    ))} </ul>)
                :
                ('')}
        </section>

    </>


}
