const { useState } = React


function PlayerResults({ resultsPlayers}) {

if(!resultsPlayers) return <Spinner />
    return <>
        <section className="player">
            {
                resultsPlayers ?
                    <ul className="player-card">
                        {resultsPlayers.map(({ firstName, surname, club, number, image, clubName, born, date, likes }) =>
                            <li className="player-card__item">
                                <div className="player-card__player">
                                    <div className="player-card__emblem">
                                        <img src={club} alt="team badge" className="player-card__emblem-item" />
                                    </div>
                                    <div className="player-card__number">
                                        <span className="player-card__number-item">{number}</span>
                                    </div>
                                    <div className="player-card__image">
                                        <img src={image} alt="player" className="player-card__image-item" />
                                    </div>
                                    <h2 className="player-card__name-first">{firstName}</h2>
                                    <h2 className="player-card__name-surname">{surname}</h2>
                                </div>
                                <hr className="player-card__line" />




                                <div className="player-card__info">
                                    <h3 className="player-card__team">Team: <span className="player-card__team-answer">{clubName}</span></h3>
                                    <h3 className="player-card__country">Country:  <span className="player-card__country-answer">{born}</span></h3>
                                    <h3 className="player-card__birth">Date of birth:  <span className="player-card__birth-answer">{date}</span></h3>
                                    <a className="player-card__like">
                                        <img src="img/heart.svg" alt="" />
                                    </a>
                                    <h4 className="player-card__count">{likes}</h4>
                                </div>

                                <hr className="player-card__small-line" />

                                <div className="player-card__comment">
                                    <input type="text" className="player-card__comment-input" placeholder="Say something..." />
                                </div>

                            </li>
                        )}
                    </ul>
                    :
                    <Feedback message="sorry, no results :(" level="warning" />
            }

        </section>
    </>
}

