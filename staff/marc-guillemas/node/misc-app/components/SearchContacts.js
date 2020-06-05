module.exports = query => {
    return `<section class="search-contacts">
    <form action="/search-contacts" method="GET">
        <input name="q" placeholder="search" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
</section>`
}