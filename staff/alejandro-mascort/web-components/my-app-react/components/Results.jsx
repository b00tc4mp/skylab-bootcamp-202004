function Results ({results}) {
    let list = results.map(({name, surname, email}) => <li>{name} {surname} ({email})</li>)

    return <section className="results">
        {results.length ? <ul>{list}</ul> : <Feedback message={'Sorry, no results :('} level={'warning'} />}
    </section>
}