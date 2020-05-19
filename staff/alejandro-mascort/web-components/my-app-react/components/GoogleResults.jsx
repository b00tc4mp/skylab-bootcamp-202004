function GoogleResults({results}) {
    let list = results.map(({title, content, link}) => <li><a href={link} target='_blank'>{title}</a> <p>{content}</p></li>)
    
    return <section className="results">
        {results.length ? <ul>{list}</ul> : <Feedback message={'Sorry, no results :('} level={'warning'} />}
    </section>  
}