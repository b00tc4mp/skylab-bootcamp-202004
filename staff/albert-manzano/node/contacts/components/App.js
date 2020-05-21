module.exports = body => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
    <section class="contacts">
     <h2>Contacts list</h2>
 <ul>
    <li><a href="http://localhost:8080/add-contact" target="_blank">add contact</a></li>
    <li><a href="http://localhost:8080/contacts" target="_blank">list contacts</a></li>
    <li><a href="http://localhost:8080/search" target="_blank">search contacts</a></li>
    <li><a href="http://localhost:8080/stickies" target="_blank">stickies</a></li>
 </ul>
 </section>
        ${body}
    </body>
</html>
`
}