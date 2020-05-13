describe('Search Team', () => {
    let player;

    beforeEach(() => {
        player = playersTop.random()

    })

    it('Sould sucess to find the emblem with idTeam', (done) => {
        call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${player}`,
            undefined, undefined, (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 200) return done(new Error(`undexpected status ${status}`))

                if (status === 200) {
                    let { player: results } = JSON.parse(body)
                    let counter = 0
                    results.forEach(result => {
                        const { idTeam } = result
                        searchTeam(idTeam, (error, emblem) => {
                            counter ++
                            expect(error).to.be.undefined
                            expect({ emblem }).to.exist
                            if(results.length === counter) done()
                        })
                    })
                   
                }
            })
    })

    it('Sould sucess to find the emblem with more than one idTeam', (done) => {
        let _player = player.substring(0, 5)

        call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${_player}`,
            undefined, undefined, (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 200) return done(new Error(`undexpected status ${status}`))

                if (status === 200) {
                    let { player: results } = JSON.parse(body)
                  let counter = 0
                    results.forEach(result => {
                        const { idTeam } = result
                        searchTeam(idTeam, (error, emblem) => {
                            counter ++
                            expect(error).to.be.undefined
                            expect({ emblem }).to.exist
                            if(results.length === counter) done()
                        })
                    })
                    
                    
                }
            })
    })



    it('should fail on a empty teamId', ()=>{
        let teamId = ''
        expect(()=>{
            searchTeam(teamId, (error, results)=>{})
        }).to.throw(Error,'Any team search')
    })

    it('should fail on no teamId String', ()=>{
        let _teamId = true
        expect(() => {
            searchTeam(_teamId, (error,results)=>{
                expect(results).to.be.undefined
            })
        }).to.throw(TypeError,`${_teamId} is not a string`)

        _teamId = 123132
        expect(() => {
            searchTeam(_teamId, (error,results)=>{
                expect(results).to.be.undefined
            })
        }).to.throw(TypeError,`${_teamId} is not a string`)

        _teamId = undefined
        expect(() => {
            searchTeam(_teamId, (error,results)=>{
                expect(error).
                expect(results).to.be.undefined
            })
        }).to.throw(TypeError,`${_teamId} is not a string`)
    })

    it('should fail on not function callback', ()=>{
        let callback = true;
        // teamId 'F.C. Barcelona'
        let teamId = '133739'
        expect(() => {
            searchTeam(teamId, callback)
        }).to.throw(TypeError,`${callback} is not a function`);

        callback = undefined;
        expect(() => {
            searchTeam(teamId, callback)
        }).to.throw(TypeError,`${callback} is not a function`);
        callback = 123132;
        expect(() => {
            searchTeam(teamId, callback)
        }).to.throw(TypeError,`${callback} is not a function`)
    })   

})