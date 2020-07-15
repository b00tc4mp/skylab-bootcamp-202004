const Http = require('./http')
require('../polyfills/url')
require('../polyfills/function')
global.XMLHttpRequest = require('xhr2')
const call = require ('./call')

    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=hola`, undefined, undefined)
        .then(({status, response}) => {  
  
            return console.log(status)
            
        })
        .catch(error => console.log(error))

        // if (error) return callback(error)
        // if (status !== 200) return callback(new Error('unknown error'))


        // const data = []

        // results.forEach(result => {
        //     const title = result.querySelector('.LC20lb').innerText

        //     const content = result.querySelector('.st').innerText

        //     const { href: link } = result.querySelector('.r > a')

        //     data.push({ title, content, link })
        // })

        // callback(undefined, data)
    // })