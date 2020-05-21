module.exports = body => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link href="images/skylab-icon.png" type="image/png" rel="Shortcut Icon">
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
        ${body}
    </body>
</html>
`
}