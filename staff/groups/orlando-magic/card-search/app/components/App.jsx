const {useState, useEffect} = React

function App(){

    const [view, setView] = useState('landing')
    const [token, setToken] = useState(undefined)
    const [card, setCard] = useState(undefined)
    const [searchConditions, setSearchConditions] = useState(undefined)
    const [userConditions, setUserConditions] = useState(undefined)
    const [id, setId] = useState(undefined)
    let hash
    const [favCards, setFavCards] = useState(undefined)
    const [socialError, setSocialError] = useState(undefined)


    useEffect(() => {
        hash = location.hash.substring(1)
       
        if (sessionStorage.token) {
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
                    if (error) throw error
                    if (isAuthenticated) {
                        setToken(sessionStorage.token)
                        if (hash === 'adv') setHashView(hash)
                        else if (hash.includes('q=')) setView('results')
                        else {
                            location.hash = ''
                            setView('landing')
                        }
                    } else {
                        sessionStorage.token = ''
                        setHashView('login')
                    }
                })
            } catch (error) {
                if (error) throw error
            }
        }
        else {
            if (hash === 'login' || hash == 'register' || hash == 'adv') setHashView(hash)
            else if (hash.includes('q=')) setView('results')
            else {
                location.hash = ''
                setView('landing')
            }
        }
    }, [])

    function setHashView(view) {
        location.hash = view

        setView(view)
    }

    function handleLanding() {
        location.hash = ''
        setView('landing')
    } 

    function handleLoggedIn(token) {
        setToken(token)
        sessionStorage.token = token
        location.hash = ''
        setView('landing')
    }

    function handleFollowing(){
        setView('following')
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

    function goToCard(card){
        setCard(card)
        setView('card') 
    }

    function goToUser(user){
        setId(user?user.id:undefined)
        setView('user')
    }

    const handleFavourite = id => {
        try{
            toggleFavouriteCard(token, id, error=>{
                if(error) setSocialError(error.message)
                retrieveUserCards(token, (error, cards)=>{
                    if (error) return setSocialError(error.message)
                    setFavCards(cards)
                }, undefined, true)
            })
        }catch(error){
            setSocialError(error.message)
        }
    }

    function onUserSearch(event){
        setUserConditions(event.target.userquery.value)
        setView('userresults')
    }

    function handleLogOut () {
        setToken(undefined)
        delete sessionStorage.token
        location.hash = ''
        setView('landing')
    }

    return <>
        {(view !== 'landing') && (view !== 'login') && (view !== 'register') && <NavBar onLanding = {handleLanding} setHashView={setHashView} onBasicSearch = {onBasicSearch}  onUserSearch = {onUserSearch} onFollowing = {handleFollowing} goToUser = {goToUser} token = {token}/>}
        {socialError && <Feedback message= {socialError} level = "error"/>}
        {view==='landing' && <Landing setHashView = {setHashView} onBasicSearch = {onBasicSearch} onLogOut={handleLogOut} onUserSearch= {onUserSearch} token={token} onFollowing= {handleFollowing}  goToUser = {goToUser}/>}
        {view==='login' && <Login onSubmit = {handleLoggedIn} setHashView = {setHashView} onLanding={handleLanding}/>}
        {view==='register'  && <Register setHashView = {setHashView} onLanding={handleLanding} onLogin = {setHashView}/>}
        {view === 'results' && <Results goToCard = {goToCard} searchConditions={searchConditions} setSearchConditions={setSearchConditions} handleFavourite = {handleFavourite} favCards = {favCards} token = {token}/>}
        {view === 'userresults' && <UserResults goToUser = {goToUser} userConditions={userConditions} token = {token}/>}
        {view === 'following' && <Following goToUser = {goToUser} token = {token}/>}
        {view === 'adv' && <Search onAdvancedSearch = {onAdvancedSearch} searchConditions = {searchConditions}/>}
        {view === 'card' && <Card card = {card}/>}
        {view === 'user' && <User userId = {id} token = {token} goToCard = {goToCard} handleFavourite = {handleFavourite} favCards = {favCards}/>}              
    </>
    
}