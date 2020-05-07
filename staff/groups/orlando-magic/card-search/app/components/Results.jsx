function Results({results, onCardClick}){

    const processResults = ()=>{
        return<>
        {results.map(card => <a onClick = {() => {onCardClick(card)}}>
                <img src = {card.image_uris.png ||card.image_uris.large}/>
            </a>)}
        </>
    }

    return <section class = 'results'>
        <header>Need display options</header>
        <article>1 – 60 of 155 cards where the name includes “a” and the text includes “b” and the card types include “artifact” and the colors ≤ R and the mana cost is greater than or equal to {1} and the converted mana cost &#60 10 and it’s legal in Vintage and the rarity is equal to common</article>
        <article class = 'results--cards'>
            {processResults()}
        </article>
    </section>
}