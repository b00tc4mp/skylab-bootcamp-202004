function EngineResults({results}){

    return <>
        <section className="results--engine">
            {results &&<ul>{results.map(({ title, content, link }) => <li><a href = {link}>{title}</a><p>{content}</p></li>)}</ul>}
            {results === [] && <Feedback message="No results were found" level="warning" />}
        </section>
    </>
}