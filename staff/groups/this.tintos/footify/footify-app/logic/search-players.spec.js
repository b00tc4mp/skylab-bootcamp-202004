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

            results.beforeEach(result =>{
                const {  date, image, football_player, position, club, number, born,id, weight, height} = result;
                expect(date).to.exist

            })
        
        })
    })

})