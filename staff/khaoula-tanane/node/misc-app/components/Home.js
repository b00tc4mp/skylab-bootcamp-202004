module.exports = () => {
  return `<section class="home">
  <h2>HOME</h2>
    <ul class = "link-list">
        <a href="/add-contact">Add Contacs</a>
        <a href="/contacts">List Contacts</a>
        <a href="/search">Search Contacts</a>
        <a href="/add-stickies">Add-stikies</a>
        <a href="/stickies">Stickies</a>
    </ul>
    <form action="/logout" method="POST">
    <button>LOGOUT</button>
    </form>
    </section>`
}
