module.exports = query => {
    return `<section class="search__stickies">
    <form action="/search-stickies" method="GET">
        <input name="q" placeholder="?" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
</section>`
}