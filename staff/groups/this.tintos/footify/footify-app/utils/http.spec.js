describe('Http test',()=>{
    let method;

    beforeEach(() => {
        const methods = [
            'GET',
            'HEAD',
            'POST',
            'PUT',
            'DELETE',
            'CONNECT',
            'OPTIONS',
            'TRACE',
            'PATCH'
        ]

        method = methods.random();
    })

    it('Sould succeed in correct method',()=>{
        expect(Http.validateMethod(method)).to.be.undefined
    })
    it('Sould fail in incorrect method',()=>{
        let _method = method.substring(0, 2)
        expect(()=>{
            Http.validateMethod(_method)
        }).to.throw(Error,`${_method} is not an HTTP method`)
    })
})
