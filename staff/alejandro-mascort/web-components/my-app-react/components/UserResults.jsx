function UserResults ({results, handleToggle}) {
    let list = results.map(({name, surname, email, following, id}) => <li key={id}>{name} {surname} ({email}) <button onClick={event => {
        event.preventDefault()

        handleToggle(id)
    }}>{following ? 'Unfollow' : 'Follow'}</button></li>)

    return <section className="results">
        {results.length ? <ul>{list}</ul> : <Feedback message={'Sorry, no results :('} level={'warning'} />}
    </section>
}