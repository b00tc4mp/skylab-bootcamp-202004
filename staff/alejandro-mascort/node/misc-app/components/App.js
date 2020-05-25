const Cookies = require('./Cookies')

module.exports = (body, cookiesAccepted) => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link href="images/skylab-icon.png" type="image/png" rel="Shortcut Icon">
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
        ${!cookiesAccepted && Cookies() || ''}
        ${body}
    </body>
</html>`
}