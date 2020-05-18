function EcosiaSearch(ecosiaFind) {

    return <section className="results">
        {ecosiaFind.length ?
            <ul>{ecosiaFind.map(({ title, content, link }) => {
                return <>
                    <h2>{`${title}`}</h2>
                    <p>{`${content}`}</p>
                    <a href={`${link}`}>{`${link}`}</a>
                </>
            })}</ul>

            : <Feedback message="sorry, no results :(" level="warning" />}
    </section>
     
}