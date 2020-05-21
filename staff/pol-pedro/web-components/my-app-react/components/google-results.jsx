function GoogleResults ({results}){
    return <ul>
        {results.map(({textTitle, textContent, link}) => <li><a href={`${link}`} target="blank">{textTitle}</a> <br/> <br/> {textContent}</li>)}
        </ul>
}