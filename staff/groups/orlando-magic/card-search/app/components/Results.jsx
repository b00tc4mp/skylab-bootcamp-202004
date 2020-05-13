const {useState, useEffect} = React

function Results({searchConditions, setSearchConditions, goToCard}){
  let [errorResults, setErrorResults] = useState(undefined)
  let [results, setResults] = useState([])

  useEffect(()=>{
    try{
      searchCard(searchConditions,(error, searchResults) =>{
        if(error) setErrorResults(error.message)
        debugger
        if (searchResults && (searchResults.length === 1)) return goToCard(searchResults[0])
        setResults(searchResults)
      })
    } catch (error) {
      if (error) {
        setErrorResults(error.message)
        setResults([])
      }
    }
  },[searchConditions])

  const handleOrder = event => {
    
    event.preventDefault()
    setSearchConditions({...searchConditions,  order: event.target.order.value, dir: event.target.dir.value})
  }
  
  return <section className="results">
    <header className="results__header">
      <form onSubmit = {handleOrder}>
        <div className="results__header--option">
          <a>Sort By</a>
          <select id="order" className="select-n">
            <option value="name">Name</option>
            <option value="released">Release Date</option>
            <option value="set">Set/Number</option>
            <option value="rarity">Rarity</option>
            <option value="color">Color</option>
            <option value="cmc">CMC</option>
            <option value="power">Power</option>
            <option value="toughness">Toughness</option>
            <option value="edhrec">EDHREC Rank</option>
            <option value="artist">Artist Name</option>
          </select>
        </div>
        <div className="results__header--option">
          <a>Direction</a>
          <select id="dir">
            <option value = "">Auto</option>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
        <div>
          <button type="submit" className="results__header--button">
            Sort
          </button>
        </div>
      </form>
    </header>
    <article>
      1 – 60 of 155 cards where the name includes “a” and the text includes “b”
      and the card types include “artifact” and the colors ≤ R and the mana cost
      is greater than or equal to {"{"}1{"}"} and the converted mana cost &lt; 10
      and it’s legal in Vintage and the rarity is equal to common
    </article>
    {errorResults && !results.length && <Feedback message= {errorResults} level = "warning"/>}
    <ul className = 'results__cards'>
      {results && results.map(card => <li key={card.id}><a onClick = {() => {goToCard(card)}}>
          <img className = "results__cards--card" src = {card.image_uris? card.image_uris.png || card.image_uris.large : (card.card_faces[0].image_uris.png || card.card_faces[0].image_uris.large)}/>
      </a>
      <div>
      <a class = "results__cards--button" onClick = {()=>{event.preventDefault();}}>L</a>
      {!card.image_uris && <a class = "results__cards--button" onClick = {()=>{event.preventDefault();}}></a>}
      </div>
      </li>)}
    </ul> 
  </section>
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