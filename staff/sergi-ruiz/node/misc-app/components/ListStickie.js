
function ListStickies(stickies) {
    return `<section class="stickies">
    <a href='/home'>Home</a>
    <h2>Stickies list</h2>
<ul>
    ${stickies.map(({ tag ,message, stickieId}) => `
    <li>${tag}</li>
    <p>${message}</p>
    <form action=/list-stickies method='POST'>
    <input name='stikieeID' style='visibility:hidden;' value=${stickieId}>
        <button>Remove</button>
    </form>
    <br>`).join('')}
</ul>
</section>`
}

module.exports = ListStickies