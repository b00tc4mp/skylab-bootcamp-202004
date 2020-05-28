module.exports = contacts => {
    return `<section class="contacts">
    <h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name, surname }) => `<li>${name} ${surname}</li>`).join('')}
</ul>
</section>`
}