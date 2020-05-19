function SearchResults({ results }) {
  return <section className="result">
    {
      results.length ?
        <ul>{
          results.map(({ title, link, content }) =>
            <li>
              <a href={link} target='_blank'>{title}</a>
              <p>{content}</p>
            </li>
          )}
        </ul>
        : <Feedback message="sorry, no results :(" level="warning" />
    }
  </section>
}