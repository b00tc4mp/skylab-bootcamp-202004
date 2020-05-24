function ListSticky(stickies){
    return `<section class="stickies">
    <h2>My stickies</h2>
    <form action="/add-sticky" method="GET">
        <button>Add  more</button>
    </form>
    <form action="/home" method="GET">
        <button>Back to home</button>
    </form>
<ul>
    ${stickies.map(({ title="",description="" }) => `<li><h1>${title}</h1><h3>${description}</h3></li>`).join('')}
</ul>
</section>`
}
module.exports=ListSticky;