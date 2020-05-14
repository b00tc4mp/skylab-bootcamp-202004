describe('createUrl', () =>{
    let url
    it ('should succed if all inputs introduced have the correct type', () => {
        url = createUrl({order:'name', dir:'asc', name:'dragon', loyalty:'5',artist:'john', limit: '='})

        expect(url).to.be.a('string')
        expect(url.length).to.be.greaterThan(0)
        expect(url).to.equal('include_multilingual=true&order=name&dir=asc&q=dragon+loy=5+artist:john+')

        url = createUrl({order:'name', dir:'asc', name:'dragon', loyalty:'5', limit: '<=', artist:'john', mana:'RB'})

        expect(url).to.be.a('string')
        expect(url.length).to.be.greaterThan(0)
        expect(url).to.equal('include_multilingual=true&order=name&dir=asc&q=dragon+mana:RB+loy<=5+artist:john+')

        url = createUrl({order:'name', dir:'asc', name:'dragon', power:'5', limit: '>=', artist:'john', mana:'RB', text:'al', lore: 'colossal'})

        expect(url).to.be.a('string')
        expect(url.length).to.be.greaterThan(0)
        expect(url).to.equal('include_multilingual=true&order=name&dir=asc&q=dragon+oracle:al+mana:RB+pow>=5+artist:john+lore:colossal+')

        url = createUrl({order:'power', dir:'desc', name:'dragon', power:'5', limit: '>=', artist:'john', mana:'RB', text:'al', lore: 'colossal', language:'en', rarity:'rm'})

        expect(url).to.be.a('string')
        expect(url.length).to.be.greaterThan(0)
        expect(url).to.equal('include_multilingual=false&order=power&dir=desc&q=dragon+oracle:al+mana:RB+pow>=5+(rarity:r+OR+rarity:m)+artist:john+lore:colossal+lang:en')
    })

    it('should fail if inputs do not have the correct type', () => {
        expect(() => {
            createUrl({order:3, dir:'asc', name:'dragon', loyalty:'5',artist:'john', limit: '='})
        }).to.throw(TypeError, '3 is not a string and is not undefined')

        expect(() => {
            createUrl({order:'name', dir:'asc', name:'dragon', loyalty: 5, limit: '<=', artist:'john', mana:'RB'})
        }).to.throw(TypeError, '5 is different from a string and boolean and is not undefined')

        expect(() => {
            createUrl({order:'name', dir:'asc', name:'dragon', power:'5', limit: '>=', artist:'john', mana:'RB', text:true, lore: 'colossal'})
        }).to.throw(TypeError, 'true is not a string and is not undefined')

        expect(() => {
            createUrl({order:'name', dir:'asc', name:'dragon', power:'5', limit: '>=', artist:'john', mana:'RB', text:true, lore: 'colossal'})
        }).to.throw(TypeError, 'true is not a string and is not undefined')

        expect(() => {
            createUrl({order:'name', dir:'asc', name:'dragon', power:'5', limit: false, artist:'john', mana:'RB', text:'a', lore: 'colossal'})
        }).to.throw(TypeError, 'false is not a string and is not undefined')
    })
})