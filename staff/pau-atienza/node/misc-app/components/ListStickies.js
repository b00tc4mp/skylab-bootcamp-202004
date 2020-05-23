module.exports = (stickies) => {
    return `<section class="contacts">
    <h2>List Stickies</h2>
<ul>
    ${stickies.map(({ tag,  comment}) => `<li><a href="#">${tag}: ${comment}</a></li>`).join('')}
</ul>
</section>`
}