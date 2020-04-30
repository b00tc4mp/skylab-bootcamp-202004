 describe("searchUser",  () => {debugger
  let name, surname, email
  
  it ('should find all users and create an array.', done => {
    searchUsers ('helena', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFhOWVhYTYwZjc1NzAwMTU3NzQyYTMiLCJpYXQiOjE1ODgyODUwNjcsImV4cCI6MTU4ODI4ODY2N30.rUw68h4cPoYulhKqm2gwTWd13cBE6mc2xmZQM5pUIgg', () =>{console.log(status)})
  call(
    "GET",
    "https://skylabcoders.herokuapp.com/api/v2/users/all",
    undefined,
    { "Content-type": "application/json", Authorization: `Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFhOWVhYTYwZjc1NzAwMTU3NzQyYTMiLCJpYXQiOjE1ODgyODUwNjcsImV4cCI6MTU4ODI4ODY2N30.rUw68h4cPoYulhKqm2gwTWd13cBE6mc2xmZQM5pUIgg` },
    (error, status, body) => {
      if (error) return callback(error)
      if (status === 200) {
        
        const users = JSON.parse(body)}

        expect(users).to.exist
        expect(users.length).to.be.greaterThan(0)
      
       return done(users)
      
      })
    })
  })
  
  

  



  