describe('URL', () => {
    it('sloud succeed in a correct url', () => {
        let url = 'https://es.wikipedia.org'
        expect(URL.validate(url)).to.be.undefined
        url = 'https://www.google.com/search?q=callback+execute+early+asyn+call+javascript&oq=callback+execute+early+asyn+call+javascript&aqs=chrome..69i57.27214j0j4&sourceid=chrome&ie=UTF-8'
        expect(URL.validate(url)).to.be.undefined
        url = 'https://www.marialunarillos.com/'
        expect(URL.validate(url)).to.be.undefined
        url = 'https://www.youtube.com/?hl=es&gl=ES'
        expect(URL.validate(url)).to.be.undefined
    })
    it('sloud fail on incorrect url', () => {
        let url = 'hello'
        expect(() => {
            URL.validate(url)
        }).to.throw(Error, `${url} is not a url`);
        url = 123123
        expect(() => {
            URL.validate(url)
        }).to.throw(Error, `${url} is not a url`);
        url = true
        expect(() => {
            URL.validate(url)
        }).to.throw(Error, `${url} is not a url`);
    })
})