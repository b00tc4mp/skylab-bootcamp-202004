module.exports = (users) => {
    return `<section class="users">
    <h2>Users list</h2>
<ul>
    ${users.map(({ name,email }) => `<li>${name}- ${email}</li>`).join('')}
</ul>
</section>`
}