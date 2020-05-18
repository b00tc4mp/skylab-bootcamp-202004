const { useEffect } = React

function HomeNews({ results, onNews }) {

  useEffect(() => {
    printNews((results) => {

      onNews(results)
    })
  }, [])

  return <section className="mediavia__results">
    <h2>Mediavida</h2>
    {results && <ul>
      {results.map(({ tittle, content, link, image }) =>
        <li key={link}>
          <a className="results__link" href={link} target="_blank"><h2>{tittle}</h2></a>
          <img src={image} />
          <p>{content}</p>
        </li>
      )}
    </ul>}
  </section>
}