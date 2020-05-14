function Card({card}){
    
    const legalities = cardlegalities => {
        const values = Object.values(cardlegalities)
        return Object.keys(cardlegalities).map((key, i) => {
            return <div className="card__content--legalityelement">
            <p className="card__content--format">{key.charAt(0).toUpperCase() + key.slice(1) + (key === 'future'?' st': '') + ':'}</p>
            <p className={'card__content--' + (values[i] === 'legal'?'legal':'illegal')}>{values[i] === 'legal'?'LEGAL':'ILLEGAL'}</p>
        </div>
        })
    }

    return<section className="card">
        <div className="card__info">
        <img className="card__image" src= {card.image_uris? card.image_uris.png || card.image_uris.large : (card.card_faces[0].image_uris.png || card.card_faces[0].image_uris.large)}/>
        <article className="card__content">
            <div className="card__content--top">
                <p className="card__content--name">{card.printed_name || card.name}</p>
                <p className="card__content--manacost">{card.mana_cost}</p>
            </div>
            <div className="card__content--typeline">
                <p>{card.printed_type_line || card.type_line}</p>
            </div>
            <ul className="card__content--content">
                {!card.card_faces?(card.printed_text? card.printed_text.split('/n').map(paragraph=><p className="card__content--oracletext">{paragraph}</p>)
                : card.oracle_text.split('\n').map(paragraph=><li className="card__content--oracletext">{paragraph}</li>)):(card.card_faces[0].printed_text? card.card_faces[0].printed_text.split('/n').map(paragraph=><p className="card__content--oracletext">{paragraph}</p>)
                : card.card_faces[0].oracle_text.split('\n').map(paragraph=><li className="card__content--oracletext">{paragraph}</li>))
                }
                <li className="card__content--flavortext">{card.flavor_text}</li>
            </ul>
            {(card.power || card.loyalty) && <div className="card__content--stats"><p>{card.power? card.power + '/' + card.toughness: "Loyalty: " + card.loyalty}</p></div>}
            <div className="card__content--artist">
            <p>Illustrated by {card.artist}</p>
            </div>
            <div className="card__content--legalities">
                {legalities(card.legalities)}
            </div>
        </article>
        </div>
        <article className="card__tools">
        <div className="card__tools--toolbox">
            <p className="card__tools--title">TOOLBOX</p>
            <a className="card__tools--link" href={card.related_uris.tcgplayer_decks} target="_blank">
            TCGPlayer decks with this card
            </a>
            <a className="card__tools--link" href={card.related_uris.edhrec} target="_blank">
            Card analysis on EDHREC
            </a>
            <a className="card__tools--link" href={card.related_uris.mtgtop8} target="_blank">
            Search MTGTop8 for this card
            </a>
        </div>
        <div className="card__tools--shopping">
            <p className="card__tools--title">BUY THIS CARD</p>
            <a className="card__tools--link" href= {card.purchase_uris.tcgplayer} target="_blank">
            Buy on TCGPlayer
            </a>
            <a className="card__tools--link" href={card.purchase_uris.cardmarket} target="_blank">
            Buy on Cardmarket
            </a>
            <a className="card__tools--link" href= {card.purchase_uris.cardhoarder} target="_blank">
            Buy on Cardhoarder
            </a>
        </div>
        </article>
    </section>
}


