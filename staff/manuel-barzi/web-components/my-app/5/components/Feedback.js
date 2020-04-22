function Feedback(message, level) {
    return mount(`<p class="feedback feedback--${level}">${message}</p>`)
}