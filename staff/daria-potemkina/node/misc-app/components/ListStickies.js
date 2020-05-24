module.exports = stickies => {
    return `<section class="contacts">
        <h1>Stickies List</h1>
        <ul>
            ${stickies.map(({ note }) => `<li>${note}</li>`).join('')}
        </ul>
    </section>`
}