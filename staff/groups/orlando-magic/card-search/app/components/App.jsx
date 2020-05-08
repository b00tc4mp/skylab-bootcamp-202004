const {useState, useEffect} = React

function App(){

    let [view, setView] = useState('landing')
    let [login, setLogin] = useState(false)
    let [results, setResults] = useState(undefined)
    let [card, setCard] = useState(undefined)

    function onBasicSearch(event){ 
        let searchInputs = {name: event.target.query.value}
        // To define inputs for search apart from callback
        searchCard(searchInputs,(error, searchResults) =>{
            setResults(searchResults)
            // searchResults.length>1 ? setView('results'): setView('card') 
            setView('results')
        })
    }

    function onAdvancedSearch(event){
        debugger
        const form = event.target 
        let searchInputs = {
            order:form.order.value,
            dir:"",
            name: form.cardname.value, 
            text: form.text.value, 
            type: form.types.value, 
            color: (form.W.checked?form.W.value:'') + (form.U.checked?form.U.value:'') + 
            (form.B.checked?form.B.value:'') + (form.R.checked?form.R.value:'') + 
            (form.G.checked?form.G.value:'') + (form.C.checked?form.C.value:''), 
            mana: form.manacost.value, 
            cmc: form.stat_1.value === "cmc" && form.statnumber.value, 
            power: form.stat_1.value === "pow" && form.statnumber.value, 
            toughtness: form.stat_1.value === "tou" && form.statnumber.value, 
            loyalty: form.stat_1.value === "loy" && form.statnumber.value, 
            limit: form.stat_1_mode.value, 
            legality: form.legality.value, 
            format: form.formats.value, 
            set: form.sets.value, 
            block: form.blocks.value, 
            rarity: (form.mythicrare.checked?form.mythicrare.value:'') + (form.rare.checked ?form.rare.value:'') + 
            (form.uncommon.checked ? form.uncommon.value:'') + (form.common.checked ?form.common.value:''), 
            artist: form.artist.value, 
            flavor: form.flavortext.value, 
            lore: form.lore.value, 
            language: form.languages.value
        }

        searchCard(searchInputs,(error, searchResults) =>{
            setResults(searchResults)
            // searchResults.length>1 ? setView('results'): setView('card') 
            setView('results')
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
    {view === 'adv' && <Search onAdvancedSearch = {onAdvancedSearch}/>}
    </>
}