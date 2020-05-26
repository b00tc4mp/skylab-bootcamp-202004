const Coockies = require('./Cookies')

module.exports = (body, cookiesAccepted) => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
        ${!cookiesAccepted && Coockies() || ''}
        ${body}
    </body>
</html>
`
}