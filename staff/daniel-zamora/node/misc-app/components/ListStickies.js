module.exports = (stickies) => {
    return `<section class="contacts">
    <h2>Sticky list</h2>
    <a class="home__link" href="add-sticky">Add sticky</a>
<ul>
    ${stickies.map(({ tag,  comment}) => `<li>${tag}: ${comment}</li>`).join('')}
</ul>
<a class="" href="add-sticky">Add sticky</a>
</section>`
}