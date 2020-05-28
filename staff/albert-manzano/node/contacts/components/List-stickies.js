function ListStickies(stickies) {
    return `<section class="stickies">
    <h2>Contacts list</h2>
<ul>
    ${stickies.map(({ message }) => `<li>${ message }</li>`).join('')}
</ul>
</section>`
}

module.exports = ListStickies