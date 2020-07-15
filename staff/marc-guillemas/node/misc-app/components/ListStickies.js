
module.exports = (stickies) => {
    return `<section class="stickies">
    <h2>Stickies list</h2>
<ul>
    ${stickies.map(({ title, comment }) => `<li>${title} ${comment} </li>`).join('')}
</ul>
</section>`
}

