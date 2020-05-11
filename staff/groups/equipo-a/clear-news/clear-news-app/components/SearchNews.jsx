const {useState} = React

function SearchNews({ onSearch, searchNewsResults, query, language, sortBy, token}) {

    // const [count, setCount] = useState(0)

    function handleSubmit(event) {
        event.preventDefault()

        let language

        let { query, sortBy } = event.target

        query = query.value

        sortBy = sortBy.value.toLowerCase()

        switch (event.target.language.value) {
            case "All":
                language = ''
            case 'English':
                language = 'en'
                break
            case 'Spanish':
                language = 'es'
                break
            case 'French':
                language = 'fr'
                break
            case 'Italian':
                language = 'it'
                break
            case 'Russian':
                language = 'ru'
                break
            case 'Portuguese':
                language = 'pt'
                break
            default:
                throw error
        }
        try{
        searchNews(token, query, language, sortBy, count, (error, searchNewsResults) =>{
            if (error) throw Error
            // count = count + 1
            // setCount(count)
            onSearch(searchNewsResults, query, language, sortBy, count)
        })
        }catch(error){
            if(error) throw error
        }
    }

    return <section>
        <form onSubmit={handleSubmit}>
            <input type="text" name="query"></input>
            <label>Select language</label>
            <select name="language">
                <option>All</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Italian</option>
                <option>Russian</option>
                <option>Portuguese</option>
            </select>
            <label>Select order to sort</label>
            <select name="sortBy">
                <option>PublishedAt</option>
                <option>Relevancy</option>
                <option>Popularity</option>
            </select>
            <button>Search</button>
        </form>
        {searchNewsResults && <NewsResults token={token} results={searchNewsResults} onSearch={onSearch} query={query} language={language} sortBy={sortBy}/>}
        {/* <button onClick = {handleSubmit}>More News</button> */}
    </section>
}
