const {useState, useEffect} = React

function App(){

    const [view, setView] = useState('landing')
    const [login, setLogin] = useState(false)
    const [token, setToken] = useState(undefined)
    const [card, setCard] = useState(undefined)
    const [searchConditions, setSearchConditions] = useState(undefined)
    const [userConditions, setUserConditions] = useState(undefined)
    const [id, setId] = useState(undefined)
    const [favCards, setFavCards] = useState(undefined)
    const [socialError, setSocialError] = useState(undefined)

    function handleLogin() {
        setView('login')
    }

    const handleFavourite = id => {
        try{
            toggleFavouriteCard(token, id, error=>{
                if(error) setSocialError(error.message)
                retrieveUserCards(token, (error, cards)=>{
                    if (error) return console.log(error)
                    setFavCards(cards)
                }, undefined, true)
            })
        }catch(error){
            setSocialError(error.message)
        }
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
        setSearchConditions({name: event.target.query.value, language: 'en'})
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

    function goToCard(card){
        setCard(card)
        setView('card') 
    }

    function goToUser(user){
        setId(user.id)
        setView('user')
    }

    function onUserSearch(event){
        setUserConditions(event.target.userquery.value)
        setView('userresults')
    }

    function handleLogOut () {
        setToken(undefined)
        setView('landing')
    }

    return <>
        {(view !== 'landing') && (view !== 'login') && (view !== 'register') && <NavBar onLanding = {handleLanding} onLogin = {handleLogin} onRegister={handleRegister} onBasicSearch = {onBasicSearch} onAdvSearch = {handleAdvSearch} onUserSearch = {onUserSearch}/>}
        {socialError && <Feedback message= {socialError} level = "error"/>}
        {view==='landing' && <Landing onLogin = {handleLogin} onRegister={handleRegister} onBasicSearch = {onBasicSearch} onLogOut={handleLogOut} token={token} onAdvSearch = {handleAdvSearch}/>}
        {view==='login' && <Login onSubmit = {handleLoggedIn} onRegister = {handleRegister} onLanding={handleLanding}/>}
        {view==='register'  && <Register onLogin = {handleLogin} onLanding={handleLanding}/>}
        {view === 'results' && <Results goToCard = {goToCard} searchConditions={searchConditions} setSearchConditions={setSearchConditions} handleFavourite = {handleFavourite} favCards = {favCards}/>}
        {view === 'userresults' && <UserResults goToUser = {goToUser} userConditions={userConditions} token = {token}/>}
        {view === 'adv' && <Search onAdvancedSearch = {onAdvancedSearch} searchConditions = {searchConditions}/>}
        {view === 'card' && <Card card = {card}/>}
        {view === 'user' && <User userId = {id} token = {token} goToCard = {goToCard} handleFavourite = {handleFavourite} favCards = {favCards}/>}              
    </>
    
}