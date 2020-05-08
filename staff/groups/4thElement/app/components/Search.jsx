const { useState } = React

function Search({ token, OnLogout }) {

    const [query, setQuery] = useState('')

    const handleLogout = () => {
        OnLogout()
    }

    const handleSubmitSpot = (query) =>{
        setQuery(query)
    }

    return <section className="Search">
        <SearchSpotCompo onSubmitSpot={handleSubmitSpot} />
        {query && <SpotResultsList  query={query}/>}

    </section>
}