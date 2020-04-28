function Result({ user }) {
  return (
    <section className="results">
      {user.length ? (
        <ul>
          {user.map(({ name, surname, email }) => (<li>{`${name}${surname} ${email}`}</li>))}</ul>) 
          : <Feedback message="no users" level="warning" />}
    </section>
  )
}
