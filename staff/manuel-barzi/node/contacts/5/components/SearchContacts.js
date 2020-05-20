module.exports = (query) => {
    return `<section class="search">
    <form action="/search" method="GET">
        <input name="q" placeholder="?" ${query? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
</section>`
}