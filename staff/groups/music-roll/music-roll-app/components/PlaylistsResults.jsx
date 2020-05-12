function PlaylistsResults({results}) {
    return <section className="playlists-results">
        <ul className="playlists-results__list">
            {results.map(({ name, description, images, id }) => {
               return <li className="playlists-results__item"><img width="100px" heigth="100px" src={`${images}`} alt=""/><h2>{`${name}`}</h2></li>
            })}
        </ul>
    </section>
}