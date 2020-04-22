function Feedback(message, level) {
    const container = this.mount(`<p class="feedback feedback--${level}">${message}</p>`)

    this.container = container;
}

Feedback.prototype = Object.create(Component.prototype)
Feedback.prototype.constructor = Feedback