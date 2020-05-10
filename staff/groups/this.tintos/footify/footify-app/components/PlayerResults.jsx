const { useState } = React

function PlayerResults({resultsPlayers, emblem}) {


    return <>
         <section className="player">
         {
        resultsPlayers ?
           <ul className="player-card">
               
{resultsPlayers.map(({firstName, surname,club, number,image, emblem}) => 

<li className="player-card__item">
<div className="player-card__player">
    <div className="player-card__emblem">
        <img src={emblem} alt="team badge" className="player-card__emblem-item" />
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
</li>
)}
    </ul>
            : 
            <Feedback message="sorry, no results :(" level="warning" /> 
         }
         
    </section>
    </>
}