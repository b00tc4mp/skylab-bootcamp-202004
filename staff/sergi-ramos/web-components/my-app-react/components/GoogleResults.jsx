function GoogleResults({ googleFind }) {

    return <section className="results">
        {googleFind.length ?
            <ul>{googleFind.map(({ title, content, link }) => {
                return <li key={link}>
                    <h2>{`${title}`}</h2>
                    <p>{`${content}`}</p>
                    <a href={`${link}`}>{`${link}`}</a>
                </li>
            })}</ul>

            : <Feedback message="sorry, no results :(" level="warning" />}
    </section>
} 