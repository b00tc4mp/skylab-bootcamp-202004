function ArtistResults({ results }) {
    return<>
        {results.length ? <ul>
            {
            results.map(({name, id, images}) => {
                return <li key={`${id}`}>{`${name}`} <a href=""><img src={`${images}`} width="100px" height="100px"></img></a></li>
            })
        }
        </ul> : console.error("fail")}
    </>
}