module.exports = (query) => {
    return `<section class="search-users">
    <h2>Search Users</h2>
    <form action="/search-users" method="POST">
        <input name="q" placeholder="?" ${query ? `value="${query}"` : ''}>
        <button>Search</button>
    </form>
    <ul>
    
    </ul>
</section>`
} 
