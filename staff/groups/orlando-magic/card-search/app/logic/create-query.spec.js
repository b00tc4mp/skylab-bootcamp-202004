describe('createQuery', () => {
    let url, path
    it('it should retrieve an object if the input is an string', () => {
        url = 'include_multilingual=false&order=name&q=a+oracle:a+type:creature+color<=WUB+f:standard+set:iko+(rarity:r+OR+rarity:u+OR+rarity:c)+lang:en'
        path = createQuery(url)
        expect(path).to.exist
        expect(path.colorLimit).to.equal('<=')
        expect(path.name).to.equal('a')
        expect(path.type).to.equal('creature')
        expect(path.oracle).to.equal('a')
        expect(path.color).to.equal('WUB')
        expect(path.f).to.equal('standard')
        expect(path.set).to.equal('iko')
        expect(path.rarity).to.equal('ruc')
        expect(path.lang).to.equal('en')

        url = 'include_multilingual=false&order=name&q=a+oracle:a+color<=U+f:standard+set:uma+(rarity:r+OR+rarity:u+OR+rarity:c)+'
        path = createQuery(url)
        expect(path).to.exist
        expect(path.colorLimit).to.equal('<=')
        expect(path.name).to.equal('a')
        expect(path.order).to.equal('name')
        expect(path.oracle).to.equal('a')
        expect(path.color).to.equal('U')
        expect(path.f).to.equal('standard')
        expect(path.set).to.equal('uma')
        expect(path.rarity).to.equal('ruc')

        url = 'include_multilingual=false&order=name&q=a+color<=U+f:standard+set:uma+(rarity:r+OR+rarity:u+OR+rarity:c)+'
        path = createQuery(url)
        expect(path).to.exist
        expect(path.colorLimit).to.equal('<=')
        expect(path.order).to.equal('name')
        expect(path.color).to.equal('U')
        expect(path.f).to.equal('standard')
        expect(path.set).to.equal('uma')
        expect(path.rarity).to.equal('ruc')

        url = 'q=a+oracle:a+type:creature+color<=WUB+f:standard+set:iko+(rarity:r+OR+rarity:u+OR+rarity:c)+lang:en'
        path = createQuery(url)
        expect(path).to.exist
        expect(path.colorLimit).to.equal('<=')
        expect(path.name).to.equal('a')
        expect(path.type).to.equal('creature')
        expect(path.oracle).to.equal('a')
        expect(path.color).to.equal('WUB')
        expect(path.f).to.equal('standard')
        expect(path.set).to.equal('iko')
        expect(path.rarity).to.equal('ruc')
        expect(path.lang).to.equal('en')
    })


    it('should fail if the input is not a string',() => {
        expect(() => {
            createQuery(undefined)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            createQuery(1)
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            createQuery(true)
        }).to.throw(TypeError, 'true is not a string')
    })
})