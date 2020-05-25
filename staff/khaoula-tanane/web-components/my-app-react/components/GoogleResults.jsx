function GoogleResults({ googleData }) {
    return <section className="results">
        {googleData && googleData.map(({title, content, link}) => (
            <div key={title}>
                <h3>
                    <a href={link}>{title}</a>
                </h3>
                <p>{content}</p>
                <hr />
            </div>
        ))}
    </section>
}