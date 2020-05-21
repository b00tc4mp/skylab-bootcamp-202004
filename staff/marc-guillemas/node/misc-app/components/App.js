module.exports = body => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
    <nav class="landing">
    <ul class="contacts">
        <li>
            <a class="contacts__add" href="/add-contact">ADD</a>
        </li>
        <li>
            <a class="contacts__list" href="/list-contacts">LIST</a>
        </li>
        <li>
            <a class="contacts__search" href="/search">SEARCH</a>
        </li>
        <li>
            <a class="contacts__detail" href="/detail">DETAIL</a>
        </li>
    </ul>
</nav>
        ${body}
    </body>
</html>
`
}