describe('searchUsers', function () {
    it('should return an empty array', function () {
        const result = searchUsers('hola')

        expect(result).to.be.an('array')
        expect(result.length).to.equal(0)
        expect(result[0]).to.equal(undefined)
    })

    it('should return an array with results', function () {
        users.length = 0;
        users.push({
            name: "daria",
            surname: "potemkina",
            email: "dariapotemkina@mail.ru",
            password: "123456789"
        })

        const result = searchUsers('daria')

        expect(result.length).to.equal(1)
        expect(result[0].name).to.equal('daria')
        expect(result[0].surname).to.equal('potemkina')
        expect(result[0].email).to.equal('dariapotemkina@mail.ru')
        expect(result[0].password).to.equal(undefined)
    })

    it('should return an error', () => {

        expect(() => {
            searchUsers('    ')
        }).to.throw(Error, 'query is empty')
    })

    it('should return a type error', () =>{
        expect( () =>{
            searchUsers(123)
        }).to.throw(TypeError, '123 is not a string')
    })
})