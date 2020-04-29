function Results({ users }) {
    return <section className="results">
        {/*{!!users.length && <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>}
        {!users.length && <Feedback message="sorry, no results :(" level="warning" />}*/}

        {/*(() => {
            if (users.length)
                return <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()*/}

        {
            users.length ?
                <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}