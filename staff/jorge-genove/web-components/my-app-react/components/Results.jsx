function Result({users, onFollow}) {
  return (
    <section className="results">
      {users.length ? (
        <ul>
          {users.map(({ name, surname, username }) => (<li>{`${name} ${surname} ${username}`}<button onClick =  {event => {
            event.preventDefault()
            
            onFollow(username)

          }}>Follow</button></li>))} </ul>) 
          : <Feedback message="no users" level="warning" />}
    </section>
  )
}
