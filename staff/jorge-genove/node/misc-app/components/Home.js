module.exports = () => {
  return `<section  class="Home">
    <h2>Home</h2>
    <ul class = "link-list">
        <a href="http://localhost:8080/add-contact">Add Contacs</a>
        <a href="http://localhost:8080/search-user>Search Users</a>
        <a href="http://localhost:8080/contacts">List Contacts</a>
        <a href="http://localhost:8080/search-contact">Search Contacts</a>
        <a href="http://localhost:8080/add-stickies">Add-stikies</a>
        <a href="http://localhost:8080/stickies">Stickies</a>
        <form action="/logout" method="POST">
        <button>Logout</button></form>
    </ul>
    </section>`;
};
