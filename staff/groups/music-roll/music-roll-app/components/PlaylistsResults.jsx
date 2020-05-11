function PlaylistsResults({results}) {
    return <section>
        <ul>
            {results.map(({ name, description, images, id }) => {
               return <li><img src={`${images}`} alt=""/><h2>{`${name}`}</h2><p>{`${description}`}</p></li>
            })}
        </ul>
    </section>
}