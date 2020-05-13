const {useState,useEffect} = React

function SearchNews({ onSearch, searchNewsResults, query, language, sortBy, token, pages}) {

    useEffect(() => {
        const query = address.hash.query()

        query && query.q && searchNews(token, query.q, "", "", (error, searchNewsResults, pages) =>{
            if (error) throw Error
    
            onSearch(searchNewsResults, query.q, language, sortBy, pages)
        })
    }, [])


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
            
        searchNews(token, query, language, sortBy, (error, searchNewsResults, pages) =>{
            if (error) throw Error
    
            onSearch(searchNewsResults, query, language, sortBy, pages)

        })
        }catch(error){
            if(error) throw error
        }
    }

    return <section className='search'>
        <form onSubmit={handleSubmit}>
            <input type="text" className="search__query" name="query"></input>
            
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
            <button className="search__button">Search</button>
        </form>


        {searchNewsResults && <NewsResults token={token} results={searchNewsResults} onSearch={onSearch} query={query} language={language} sortBy={sortBy} pages={pages}/>}
        
    </section>
}
