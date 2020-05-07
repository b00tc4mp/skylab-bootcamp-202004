const {useState, useEffect} = React

function App(){

    let [view, setView] = useState('landing')
    let [login, setLogin] = useState(false)
    let [results, setResults] = useState(undefined)

    function onBasicSearch(event){
        const query = event.target.query.value
        // To define inputs for search appart from callback
        searchCard((error, searchResults) =>{
            setResults(searchResults)
            searchResults.length>1 ? setView('results'): setView('card') 
        })
    }

    return <>
    <Landing login = {login} setView = {setView} onBasicSearch = {onBasicSearch}/>
    {/* {view === 'landing' && <Landing login = {login} setView = {setView} onBasicSearch = {onBasicSearch}/>}
    {view === 'results' && <Results/>}
    {view === 'card' && <Card/>} */}
    </>
}