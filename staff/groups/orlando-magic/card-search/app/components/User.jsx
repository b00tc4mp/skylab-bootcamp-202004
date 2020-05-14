
function User({userId = "", token, goToCard, handleFavourite, favCards}){
    const [profileError, setProfileError] = useState(undefined)
    const [user, setUser] = useState(undefined)

    useEffect(() =>{
        try{
            retrieveUser(token, (error, userInfo)=>{
                if (error) return setProfileError(error.message)

                retrieveUserCards(token, (error, userCards) =>{
                    if (error) return setProfileError(error.message)

                    userInfo.myCards = userCards
                    setUser(userInfo)
                }, userId)
            }, userId)
        }catch(error){
            setProfileError(error.message)
        }
    }, [])

    return <section className = "results">
    {user && <><header className = "results__header"><h1>{user.nickname}</h1><h2>{user.nickname} has {user.myCards.length} cards marked as favourites{user.myCards.length ? ":" : '.'}</h2></header>
    <ul className = 'results__cards'>
      {user.myCards && user.myCards.map(card => <li key={card.id}><a onClick = {() => {goToCard(card)}}>
          <img className = "results__cards--card" src = {card.image_uris? card.image_uris.png || card.image_uris.large : (card.card_faces[0].image_uris.png || card.card_faces[0].image_uris.large)}/>
      </a>
      <div>
      {typeof token === 'undefined'?"":<a className = {`results__cards--button ${favCards && favCards.includes(card.id)?"unfav":""}`} onClick = {()=>{event.preventDefault(); handleFavourite(card.id)}}></a>}      </div>
      </li>)}</ul></>}
    </section>
}