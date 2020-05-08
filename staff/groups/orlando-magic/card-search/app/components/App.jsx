const {useState, useEffect} = React

function App(){

    let [view, setView] = useState('landing')
    let [login, setLogin] = useState(false)
    let [results, setResults] = useState(undefined)
    let [card, setCard] = useState(undefined)

    function onBasicSearch(event){
        const query = event.target.query.value
        // To define inputs for search apart from callback
        searchCard(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,query,undefined,(error, searchResults) =>{
            setResults(searchResults)
            searchResults.length>1 ? setView('results'): setView('card') 
        })
    }

    function onCardClick(card){
        setCard(card)
        setView('card') 
    }

    return <>
    {view === 'landing' && <Landing login = {login} setView = {setView} onBasicSearch = {onBasicSearch}/>}
    {view !== 'landing' && <NavBar login = {login} setView = {setView} onBasicSearch = {onBasicSearch}/>}
    {view === 'results' && <Results results = {results} onCardClick = {onCardClick}/>}
    {view === 'card' && <Card card = {card}/>}
    </>
}