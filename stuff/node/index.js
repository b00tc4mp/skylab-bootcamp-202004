const fs = require('fs')

fs.readdir('.', (error, files) => {
    if (error) throw error

    console.log(files)
})

fs.mkdir('pepito', error => {
    if (error) throw error

    console.log('directory created')
})
