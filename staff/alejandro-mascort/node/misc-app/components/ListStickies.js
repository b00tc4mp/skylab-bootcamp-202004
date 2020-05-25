
function ListStickies(stickies, feedback) {
    return `<section class="contacts">
    <a href='/home'>Home</a>
    <h2>Stickies list</h2>
<ul>
    ${stickies.length?stickies.map(({ tag ,message, stickieId}) => `
    <li>${tag}</li>
    <p>${message}</p>
    <form action="/stickies" method="POST">
    <input name='stickieId' style='visibility:hidden;' value=${stickieId}>
        <button>Remove</button>
    </form>
    <br>`).join(''):`${feedback?'':'No stickies added'}`}
</ul>
${feedback?feedback:''}
</section>`
}

module.exports = ListStickies