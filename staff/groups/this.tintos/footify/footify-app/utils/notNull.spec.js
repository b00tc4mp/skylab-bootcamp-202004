describe('Change null value in a object Function',()=>{
    
    it('sloud succeed to return "-" ',()=>{
        expect(
            notNull(null)
        ).to.equal('-')
    })
    it('sloud succeed returning the value',()=>{
        var name = names.random()
        expect(
            notNull(name)
        ).to.equal(name)
    })
    it('sloud fail on typeof number',()=>{
       let number = 123213
       expect(()=>{
        notNull(number)
    }).to.throw(TypeError,`${number} is a number.`);
    })
    it('sloud fail on typeof function',()=>{
        expect(()=>{
            notNull((value)=>{})
        }).to.throw(TypeError,`not admit a function.`);
    })

})