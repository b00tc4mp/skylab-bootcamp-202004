describe('Function verification',()=>{

    it('should succeed on correct function',()=>{
        expect(Function.validate((element) => {})).to.be.undefined
    })
    it('should fail on incorrect function',()=>{
        let element = true
        expect(()=>{
            Function.validate(element)
        }).to.throw(Error,`${element} is not a function`);
        element = 'hello'
        expect(()=>{
            Function.validate(element)
        }).to.throw(Error,`${element} is not a function`);
        element = undefined
        expect(()=>{
            Function.validate(element)
        }).to.throw(Error,`${element} is not a function`);
    })
})