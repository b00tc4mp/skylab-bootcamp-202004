function GoogleResults({results}) {
    
    return <section className="results">
        {
            results.length ?
                <ul> 
                    {
                    results.map(({ title, content, link }) =>
                        <h3>
                            <a href={link} target= "_blank">{title}</a>
                            <p>{content}</p>
                            <hr/>
                        </h3>)
                    }
                </ul>
                : <Feedback message="sorry, no results :(" level="warning"/>
        }
    </section>
}; 