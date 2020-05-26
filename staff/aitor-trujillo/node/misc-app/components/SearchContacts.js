module.exports = query => {
    return `<section class="search-contacts">
    <form action="/search-contacts" method="GET">
        <input name="q" placeholder="?" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
</section>`
}