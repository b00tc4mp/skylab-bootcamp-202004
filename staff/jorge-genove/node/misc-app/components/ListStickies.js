
module.exports = (stickies) => {
    return `<section class="contacts">
    <h2>Stickie list</h2>
<ul>
    ${stickies.map(({ usrname, comment }) => `<li>${usrname} : ${comment}</li>`).join('')}
</ul>
</section>`
}

