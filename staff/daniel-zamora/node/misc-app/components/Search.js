module.exports = (string, query) => {
    return `<section class="search-contacts">
    <form action="/${string}" method="GET">
        <input name="q" placeholder="?" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
    <a href = '/home'>Home</a>
</section>`
}