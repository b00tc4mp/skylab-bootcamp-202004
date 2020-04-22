describe('searchUsers', function (){
    let usersFound

    it('should return an empty array if there are no matches', function() {
        usersFound = searchUsers('user')
        
        expect(usersFound).to.be.an('array')
        expect(usersFound.length).to.equal(0)
    })

    it('should return an array with the matches', function() {
        users.push({name: 'userone', surname: 'useronesurname', email: 'userone@email.com', password: '123'})
        users.push({name: 'usertwo', surname: 'usertwosurname', email: 'usertwo@email.com', password: '123'})

        usersFound = searchUsers('user')

        expect(usersFound).to.be.an('array')
        expect(usersFound.length).to.equal(2)
        expect(usersFound[0].name).to.equal('userone')
        expect(usersFound[0].surname).to.equal('useronesurname')
        expect(usersFound[0].email).to.equal('userone@email.com')
        expect(usersFound[1].name).to.equal('usertwo')
        expect(usersFound[1].surname).to.equal('usertwosurname')
        expect(usersFound[1].email).to.equal('usertwo@email.com')
    })
})