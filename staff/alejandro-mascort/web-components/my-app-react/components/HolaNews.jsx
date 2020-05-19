function HolaNews() {
    const [error, setError] = useState(undefined)
    const [results, setResults] = useState(undefined)

    useEffect( () => {
        retrieveHolaNews((error, results) => {
            if (error) setError(error.message)
            else {
                let list = results.map(({image, link, text}) => <li key={link}><a href={link} target='_blank'><img src={image}/></a> <p>{text}</p></li>)
                setResults(list)
            }
        })
    })

    return <section className="hola-news">
        <h2>Hola News</h2>
        {error && <Feedback message={error} level='error' />}
        {results && <ul>{results}</ul>}
    </section>
}