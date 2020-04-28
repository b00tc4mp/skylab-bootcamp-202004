function GoogleResults({data}) {
    return <section>
        
        {(() => { debugger
            if(data.length)
        return <ul>{data.map(({ title, content, link }) => <li><a href={`${link}`}><h2>{`${title}`}</h2></a><p>{`${content}`}</p></li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()}
    
    </section>
}