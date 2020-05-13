const {useState} = React
function SearchUsers({token, onUserSessionExpired}){

    const [userResults, setUserResults] = useState(undefined)
    const [_query, setQuery] = useState(undefined)

    const handleSubmit = (event) => {
        event.preventDefault()

        let { query } = event.target

        query = query.value
        setQuery(query)
        searchUsers(token, query, (error, results) => {
            if(error) console.error(error)
            
            setUserResults(results)
        })
    }

    const handleToggle = () => {
        searchUsers(token, _query, (error, results) => {
            if(error) console.error(error)
            
            setUserResults(results)
        })
    }


    return <>
    <section>
        <h2>Search friends! {`${token}`}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="query"/>
            <button>🔎</button>
        </form>
    </section>
    <section>
        {userResults && <UserResults results={userResults} token={token} onUserSessionExpired = {onUserSessionExpired} onToggleFollow={handleToggle}/>}
    </section>
    </>
}