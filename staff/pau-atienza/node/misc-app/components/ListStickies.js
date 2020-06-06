module.exports = (stickies) => {
    return `<section class="contacts">
    <a class="home__link" href="add-sticky">Add sticky</a>
    <h2>Sticky list</h2>
<ul>
    ${stickies.map(({ tag,  comment}) => `<li>${tag}: ${comment}</li>`).join('')}
</ul>
</section>`
}