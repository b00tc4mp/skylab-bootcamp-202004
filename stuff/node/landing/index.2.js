const fs = require('fs')

fs.readdir('.', (error, files) => {
    if (error) throw error

    console.log(files)
})

fs.mkdir('new-folder', error => {
    if (error) throw error

    console.log('directory created')
})

fs.writeFile('hello-world.txt', 'Hello, World!', error => {
    if (error) throw error
})
