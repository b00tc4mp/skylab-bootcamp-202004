module.exports = body => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
        ${body}
    </body>
    <script src="components/Compo.js" ></script>
</html>
`
}