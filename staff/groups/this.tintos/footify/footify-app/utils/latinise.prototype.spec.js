describe('Convert caracter',()=>{

    it('should succeed on change String caracteres',()=>{
        let name = 'Sérgio'
        expect(name.latinise()).to.equal('Sergio')
        name = 'Ibrahimović'
        expect(name.latinise()).to.equal('Ibrahimovic')
        name = 'Noël'
        expect(name.latinise()).to.equal('Noel')
        name = 'François'
        expect(name.latinise()).to.equal('Francois')
 
    })
    it('should fail on no String',()=>{
        let name = true
        expect(()=>{
            name.latinise()
        }).to.throw(TypeError,`name.latinise is not a function`);
        name = 12331
        expect(()=>{
            name.latinise()
        }).to.throw(TypeError,`name.latinise is not a function`);
        name = undefined
        expect(()=>{
            name.latinise()
        }).to.throw(TypeError,`Cannot read property \'latinise\' of undefined`);
    })
})