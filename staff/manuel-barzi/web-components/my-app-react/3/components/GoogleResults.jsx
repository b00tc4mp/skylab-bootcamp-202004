function GoogleResults({ results }) {
    return <section className="results">
        {
            results.length ?
                <ul>{
                    results.map(({ title, content, link }) =>
                        <li>
                            <a href={link} target="_blank">{title}</a>
                            <p>{content}</p>
                        </li>)
                }</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}