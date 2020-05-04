
function UsersResults({ results, userToken, searchSubmit, userEmail }) {

  const checkFollow = (userToken, userEmail) => {
    // CALL TO API TO GET FOLLOWING LIST
    findMyUser(userToken, userEmail, (error, myUser) => {
      if (error) throw new Error(error)

      const idList = []
      for (let i = 0; i < results.length; i++) idList.push(results[i].id)

      if (myUser.following)
        if (myUser.following.indexOf(idList) !== -1)
          return 'Following'
        else
          return 'Follow'
    })
  }

  const handleFollow = (id) => { // GET ID AND PUSH TO FOLLOWING

    findMyUser(userToken, userEmail, (error, myUser) => {
      if (error) throw new Error(error)

      // if (!myUser.following)
      //   myUser.following.push(id)   // PENDING

    })


    checkFollow(email, loggedUser)
  }

  return <section>
    <Search query={searchSubmit} />

    {results.length && <ul>{results.map(({ name, surname, email, id }) => <li>{`${name} ${surname} (${email})`}<button onClick={event => { event.preventDefault(); handleFollow(id) }}>{`${checkFollow(userToken, userEmail)}`}</button></li>)}</ul>}
    {!results.length && results instanceof Array && <Feedback message="sorry, no results :(" level="warning" />}


  </section>
}


