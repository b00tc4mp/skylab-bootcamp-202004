const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/hello-world', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link href="images/skylab-icon.png" type="image/png" rel="Shortcut Icon">
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
        hola mundo!!!
    </body>
</html>`)
})

app.post('/hello-world', (req, res) => {
    res.send('ok, post received')
})

app.listen(8080)