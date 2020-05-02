function Results({ results }) {
  return <section className="result">
    {
      results.length ?
        <ul>
          {
            results.map(({ name, surname, email }) =>
              <li>{`${name} ${surname} (${email})`}<button>follow</button></li>)}
        </ul>
        : <Feedback message='sorry, you has 0 results :(' level='warning' />}
  </section>
}