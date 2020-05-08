const {useState, useEffect} = React

function Results({results, onCardClick}){
    
    
    const processResults = (results)=>{
        debugger
        return results.map(card => <li key={card.id}><a onClick = {() => {onCardClick(card)}}>
            <img className = "results_cards--card" src = {card.image_uris? card.image_uris.png || card.image_uris.large : (card.card_faces[0].image_uris.png || card.card_faces[0].image_uris.large)}/>
        </a></li>)
    }

    return <section className = 'results'>
        <header>Need display options</header>
        <article>1 – 60 of 155 cards where the name includes “a” and the text includes “b” and the card types include “artifact” and the colors ≤ R and the mana cost is greater than or equal to {1} and the converted mana cost &#60 10 and it’s legal in Vintage and the rarity is equal to common</article>
        <ul className = 'results_cards'>
            {processResults(results)}
            {/* {results.map(card => {<li key={card.id}><a onClick = {() => {onCardClick(card)}}>
            <img className = "results_cards--card" src = {card.image_uris.png || card.image_uris.large}/>
    </a></li>})}*/}
        </ul> 
    </section>
    // me oyes?
}

{/* <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  </div>
</div> */}

//card.card_faces? <button onClick={}>Transform</button>:undefined
//(card.card_faces[0].image_uris.png || card.card_faces[0].image_uris.large)