module.exports = query => {
    return `<section class="search-stickies">
    <form action="/search-stickies" method="GET">
        <input name="q" placeholder="search" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
</section>`
}