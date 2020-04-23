class Feedback extends Component {
    constructor(message, level) {
        super(`<p class="feedback feedback--${level}">${message}</p>`);
    }
}
