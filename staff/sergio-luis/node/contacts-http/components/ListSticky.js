module.exports = (stickies) => {
    return `<section class="contacts">
    <h2>Contacts list</h2>
<ul>
    ${stickies.map(({ tag,  message}) => `<li>${name}: ${message}</li>`).join('')}
</ul>
</section>`
}
