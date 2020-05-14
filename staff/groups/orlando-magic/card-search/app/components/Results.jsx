const {useState, useEffect} = React

function Results({searchConditions, setSearchConditions, goToCard, handleFavourite, favCards, token}){
  let [errorResults, setErrorResults] = useState(undefined)
  let [results, setResults] = useState([])
  let url, query

  useEffect(()=>{
    try{
      if (searchConditions) {
        url = createUrl(searchConditions)
        location.hash = url
      }
      else {
        url = location.hash.substring(1)
        query = createQuery(url)
        url = createUrl(query)
        location.hash = url
      }
      searchCard(url,(error, searchResults) =>{
        if(error) setErrorResults(error.message)
        
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
    if (!searchConditions) {
      query = createQuery(location.hash.substring(1))
      query['order'] = event.target.order.value
      query['dir'] =  event.target.dir.value
      query['language'] =  'en'
      setSearchConditions(query)

    } else setSearchConditions({...searchConditions,  order: event.target.order.value, dir: event.target.dir.value});
    
    location.hash = createUrl(searchConditions)
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
    {/* <article></article> */}
    {errorResults && !results.length && <Feedback message= {errorResults} level = "warning"/>}
    <ul className = 'results__cards'>
      {results && results.map(card => <li key={card.id}><a onClick = {() => {goToCard(card)}}>
          <img className = "results__cards--card" src = {card.image_uris? card.image_uris.png || card.image_uris.large : (card.card_faces[0].image_uris.png || card.card_faces[0].image_uris.large)}/>
      </a>
      <div>
        {typeof token === 'undefined'?"":<a className = {`results__cards--button ${favCards && favCards.includes(card.id)?"unfav":""}`} onClick = {()=>{event.preventDefault(); handleFavourite(card.id)}}></a>}
        {/* {!card.image_uris && <a className = "results__cards--button" onClick = {()=>{event.preventDefault()}}></a>} */}
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