function Feedback(message, level) {
    Component.call(this, `<p class="feedback feedback--${level}">${message}</p>`)
}

Feedback.prototype = Object.create(Component.prototype)
Feedback.prototype.constructor = Feedback