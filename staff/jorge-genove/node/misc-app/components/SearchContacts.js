module.exports = (query)=> {
    return `<section class="search-contacts">
    <form action="/search-contact" method="POST">
        <input name="q" placeholder="?" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
    <ul>
    
    </ul>
</section>`
}