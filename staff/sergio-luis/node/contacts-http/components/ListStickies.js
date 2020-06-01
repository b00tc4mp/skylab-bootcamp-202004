module.exports = (stickies) => {
    return `<section class="contacts">
    <h2>Contacts list</h2>
<ul>
    ${stickies.map(({ tag,  comment}) => `<li>${tag}: ${comment}</li>`).join('')}
</ul>
</section>`
}
