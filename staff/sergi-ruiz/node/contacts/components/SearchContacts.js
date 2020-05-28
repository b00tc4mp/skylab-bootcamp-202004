module.exports = query => {
    return `<section class="search-contacts">
    <form action="/search" method="GET">
        <input name="q" placeholder="contact" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
</section>`
}