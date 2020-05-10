describe('Email verification',()=>{

    let name, surname, email;

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
    })


    it('should succeed on correct email',()=>{
        expect(Email.validate(email)).to.be.undefined
    })
    it('should fail on incorrect email',()=>{
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}`
        expect(()=>{
            Email.validate(email)
        }).to.throw(Error,`${email} is not an e-mail`);
    })
   
})