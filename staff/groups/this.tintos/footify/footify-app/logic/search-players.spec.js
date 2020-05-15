describe('Search players',()=>{
    let player;

    beforeEach(()=>{
        player = playersTop.random()
    })

    it('should succeed on correct data', done =>{
        expect(typeof player).to.be.a('string');

        searchPlayers(player, (error, results)=>{

            expect(error).to.be.undefined;
            expect(results).to.exist
         

            results.forEach(result =>{
                const { date, image, firstName, surname, position, club, number, born,id, weight, height} = result;
                expect(date).to.exist
                expect(image).to.exist
                expect(firstName).to.exist
                expect(surname).to.exist
                expect(position).to.exist
                expect(club).to.exist
                expect(number).to.exist
                expect(born).to.exist
                expect(id).to.exist
                expect(weight).to.exist
                expect(height).to.exist
            })
            done()
        
        })
    })
    it('should succeed on search a incomplet name', done =>{
        
        let _player = player.substring(0, 6)
        
        expect(typeof player).to.be.a('string');

        searchPlayers(_player, (error, results)=>{
            expect(error).to.be.undefined;

            expect(results).to.exist
            
            results.forEach(result =>{
                const { date, image, firstName, surname, position, club, number, born,id, weight, height} = result;
                expect(date).to.exist
                expect(image).to.exist
                expect(firstName).to.exist
                expect(surname).to.exist
                expect(position).to.exist
                expect(club).to.exist
                expect(number).to.exist
                expect(born).to.exist
                expect(id).to.exist
                expect(weight).to.exist
                expect(height).to.exist
            })
            done()
          

        })
    })

   /* it('should fail on a empty query', ()=>{
        let _player = ''
        expect(()=>{
            searchPlayers(_player, (error, results)=>{})
        }).to.throw(Error,'Any result search')
    })*/

    it('should fail on no query String', ()=>{
        player = true
        expect(() => {
            searchPlayers(player, (error,results)=>{
                expect(results).to.be.undefined
            })
        }).to.throw(TypeError,`${player} is not a string`)

        player = 123132
        expect(() => {
            searchPlayers(player, (error,results)=>{
                expect(results).to.be.undefined
            })
        }).to.throw(TypeError,`${player} is not a string`)

        player = undefined
        expect(() => {
            searchPlayers(player, (error,results)=>{
                expect(results).to.be.undefined
            })
        }).to.throw(TypeError,`${player} is not a string`)
    })

    it('should fail on not function callback', ()=>{
        let callback = true;
        expect(() => {
            searchPlayers(player, callback)
        }).to.throw(TypeError,`${callback} is not a function`);

        callback = undefined;
        expect(() => {
            searchPlayers(player, callback)
        }).to.throw(TypeError,`${callback} is not a function`);
        callback = 123132;
        expect(() => {
            searchPlayers(player, callback)
        }).to.throw(TypeError,`${callback} is not a function`);
    })
  
})