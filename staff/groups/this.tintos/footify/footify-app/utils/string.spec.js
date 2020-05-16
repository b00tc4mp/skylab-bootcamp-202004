describe('String',()=>{
    let name, surname, email, password,confirmPassword;

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random();
        confirmPassword= password;

    })

    it('Sould be fail in alphabetic name',()=>{
        expect(String.validate.alphabetic(name)).to.be.undefined
    })
    it('Sould be succeed in engthGreaterEqualThan',()=>{
        expect(String.validate.lengthGreaterEqualThan(password,8)).to.be.undefined
    })
    it('Sould be succeed in equalThan',()=>{
        expect(String.validate.equalThan(password,confirmPassword)).to.be.undefined
    })
    it('Sould be succeed in notVoid',()=>{
        expect(String.validate.notVoid(password)).to.be.undefined
    })

    it('Sould be fail in alphabetic name',()=>{
        name = '%'
        expect(()=>{String.validate.alphabetic(name)}).to.throw(Error,`${name} is not alphabetic`);
        name = '&'
        expect(()=>{String.validate.alphabetic(name)}).to.throw(Error,`${name} is not alphabetic`);
        name = '$'
        expect(()=>{String.validate.alphabetic(name)}).to.throw(Error,`${name} is not alphabetic`);
    })
    it('Sould be fail in engthGreaterEqualThan',()=>{
        password = password.substring(0, 6)
        let length = 8;
        expect(()=>{String.validate.lengthGreaterEqualThan(password,length)}).to.throw(Error,`"${password}" length is not greater or equal than ${length}`);
    })
    it('Sould be fail in equalThan',()=>{
        confirmPassword = password + '123'
        expect(()=>{String.validate.equalThan(password,confirmPassword)}).to.throw(Error,`Fail the comparation!`);
    })
    it('Sould be fail in notVoid',()=>{
        password = '';
        expect(()=>{String.validate.notVoid(password)}).to.throw(Error,`${password} is empty or blank`);
    })
})





