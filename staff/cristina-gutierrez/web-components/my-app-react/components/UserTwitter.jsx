function user ({results, following, toggleUser}) {
    let list = results.map(({name, surname, email, id}) => <li>{name} {surname} ({email}) <button onClick={event => {
        event.preventDefault()

        toggleUser(id)
    }}>{following.includes(id) ? 'Unfollow' : 'Follow'}</button></li>)

    return <section className="results">
        {results.length ? <ul>{list}</ul> : <Feedback message={'Sorry, no results :('} level={'warning'} />}
    </section>
}