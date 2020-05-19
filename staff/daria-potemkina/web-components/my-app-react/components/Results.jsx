function Results ({results, error, following, toggleFollowUser}){

  return <section className="result">
    {
      results.length ?
        <ul>
          {
            results.map(({ name, surname, email, id }) =>
              <li key={id}>{`${name} ${surname} (${email})`}<button onClick={event =>{
              event.preventDefault()

               toggleFollowUser(id)}}>{following.includes(id) ? 'unfollow' : "follow"}</button></li>)}
        </ul>
        : <Feedback message='sorry, you has 0 results :(' level='warning' />}
  </section>

}