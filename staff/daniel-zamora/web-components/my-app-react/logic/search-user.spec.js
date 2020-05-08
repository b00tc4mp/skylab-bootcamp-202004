describe("searchUser",  () => {
    let name, surname, email
    
    it ('should find all users and create an array.', done => {
    call(
      "GET",
      "https://skylabcoders.herokuapp.com/api/v2/users/all",
      undefined,
      { "Content-type": "application/json", Authorization: `Bearer: ${token}` },
      (error, status, body) => {
        if (error) return callback(error)
        if (status === 200) {
          
          const users = JSON.parse(body)}
  
          expect(users).to.exist
          expect(users.length).to.be.greaterThan(0)
        })
      })
    });