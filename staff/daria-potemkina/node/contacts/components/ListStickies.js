module.exports = stickies => {
    return `<section class="contacts">
        <h1>Stickies List</h1>
        <ul>
            ${stickies.map(({ stiky }) => `<li>${stiky}</li>`).join('')}
        </ul>
    </section>`
}