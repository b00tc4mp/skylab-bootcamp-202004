function GoogleResults({results}) {
    return <section>
        
        {(() => { debugger
            if(results.length)
        return <ul>{results.map(({ title, content, link }) => <li><a href={`${link}`}><h2>{`${title}`}</h2></a><p>{`${content}`}</p></li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()}
    
    </section>
}