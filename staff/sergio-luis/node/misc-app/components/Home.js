module.exports = (name,feedback) => {

    return `<section class="landing">
    <h2>${name ?`Welcome ${name}`:''}</h2>
    <ul class = "link-list">
    <div>
        <a href="/add-contact">Add Contact</a>
        <a href="/contacts">List Contacts</a>
        <a href="/search-contacts">Search Contacts</a>
    </div>
    <div>    
        <a href="/add-stickie">Add Stickie</a>
        <a href="/stickies">List Stickies</a>
        <a href="/search-stickies">Search Stickies</a>
    </div>     
        <form action="/logout" method="POST">
            <button>Logout</button>
        </form>
    </ul>
    ${feedback?feedback:''}
    </section>`
}