describe.only('search-news', () => {

    describe('expect to succed on searching news', () => {

        let query = "ps5";
        let sortBy= undefined;
        let language="en";
        let counter;
        it('should succeed on language', done => {
            counter=0
            searchNews(query, language, sortBy, counter, (articles) => {
            
                // articles.forEach(article => {
                //     const item= Object.values(article)
                //     item.forEach(article=>{
                //         article =item.includes(query)
                //     debugger
                //     expect(article).to.be.true
                //     })
                //     article= Object.keys(articles).map(function (key) { return [String(key), articles[key]] })   
                // });

                expect(articles.length).to.equal(20);
                expect(articles).to.exist;
                done();
            });
        });

        it('should succeed on bringing 100 articles', done => {
            counter = 4

            searchNews(query, language, sortBy, counter, (articles) => {
                expect(articles.length).to.equal(100);
                expect(articles).to.exist;
                done();
            }) ;
        });

        it('should succeed on undefined parameter but query', done => {
            searchNews(query, "", "", "", (articles) => {
    
                expect(articles.length).to.equal(20);
                expect(articles).to.exist;
                done();
            });
        });
    });

   

})