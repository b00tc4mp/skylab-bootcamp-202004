module.exports = name => {
    return `<section class="home">
            <h1>Welcome ${name}</h1>
            <ul>
                <li><a href="http://localhost:8080/contacts">List contacts</a></li>
                <li><a href="http://localhost:8080/add-contact">Add contact</a></li>
                <li><a href="http://localhost:8080/search">Search contacts</a></li>
                <li><a href="http://localhost:8080/add-sticky">Add sticky</a></li>
                <li><a href="http://localhost:8080/stickies">List stickies</a></li>
                <li><a href="http://localhost:8080/search-stickies">Search stickies</a></li>
            </ul>
            <form action="/logout" method="POST">
                <button>Logout</button>
            </form>
        </section>`
}
