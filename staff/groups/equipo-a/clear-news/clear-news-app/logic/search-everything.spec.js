describe('search-everything', () => {
    // searchEverything(query, language, sortBy, callback)

    describe('expect to succed on searching news in english', () => {

        let query = "bitcoin"
        let language = "en"
        let sortBy = undefined
        it('should succeed on undefined language', done => {
            searchEverything(query, language, sortBy, (articles)=> {
                debugger
                // articles.forEach(article => {
                //     const item= Object.values(article)
                //     item.forEach(article=>{
                //         article =item.includes(query)
                //     debugger
                //     expect(article).to.be.true
                //     })
                //     // article= Object.keys(articles).map(function (key) { return [String(key), articles[key]] })
                //     // let _article=article.flat()        
                    
                // });

               

              
                expect(articles.length).to.equal(20)
                expect(articles).to.be.ok
                done()
                
            })
        })
    })
})