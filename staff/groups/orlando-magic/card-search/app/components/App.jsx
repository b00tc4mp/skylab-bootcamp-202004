const {useState, useEffect} = React

function App(){

    let [view, setView] = useState('landing')
    let [login, setLogin] = useState(false)
    let [token, setToken] = useState(undefined)
    let [card, setCard] = useState(undefined)
    let [searchConditions, setSearchConditions] = useState(undefined)

    function handleLogin() {
        setView('login')
    }

    function handleRegister() {
        setView('register')
    }

    function handleLanding() {
        setView('landing')
    } 

    function handleLoggedIn(token) {
        setToken(token)
        setView('landing')
    }

    function handleAdvSearch(){
        setView('adv')
    }

    function onBasicSearch(event){
        setSearchConditions({name: event.target.query.value})
        setView('results')
    }

    function onAdvancedSearch(event){
        const form = event.target 
        setSearchConditions({
            order:form.order.value,
            dir:"",
            name: form.cardname.value, 
            text: form.text.value, 
            type: form.types.value, 
            color: (form.W.checked?form.W.value:'') + (form.U.checked?form.U.value:'') + 
            (form.B.checked?form.B.value:'') + (form.R.checked?form.R.value:'') + 
            (form.G.checked?form.G.value:'') + (form.C.checked?form.C.value:''), 
            colorLimit: form.color_comparison.value,
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
        })
        setView('results')
    }

    function onCardClick(card){
        setCard(card)
        setView('card') 
    }

    function handleLogOut () {
        setToken(undefined)
        setView('landing')
    }

    return <>
        {view !== 'landing' && <NavBar onLogin = {handleLogin} onRegister={handleRegister} onBasicSearch = {onBasicSearch} onAdvSearch = {handleAdvSearch}/>}
        {view==='landing' && <Landing onLogin = {handleLogin} onRegister={handleRegister} onBasicSearch = {onBasicSearch} onLogOut={handleLogOut} token={token} onAdvSearch = {handleAdvSearch}/>}
        {view==='login' && <Login onSubmit = {handleLoggedIn} onRegister = {handleRegister} onLanding={handleLanding}/>}
        {view==='register'  && <Register onLogin = {handleLogin} onLanding={handleLanding}/>}
        {view === 'results' && <Results onCardClick = {onCardClick} searchConditions={searchConditions} setSearchConditions={setSearchConditions}/>}
        {view === 'adv' && <Search onAdvancedSearch = {onAdvancedSearch}/>}
        {view === 'card' && <Card card = {card}/>}
    </>
        /*{view === 'landing' && <Landing login = {login} setView = {setView} onBasicSearch = {onBasicSearch}/>}
    {view !== 'landing' && <NavBar login = {login} setView = {setView} onBasicSearch = {onBasicSearch}/>}
    {view === 'results' && <Results results = {results} onCardClick = {onCardClick}/>}
    {view === 'card' && <Card card = {card}/>}*/
    
}