class Feedback extends Component {
    debugger
    constructor(message ,level){
        super(`<p class="feedback feedback--${level}">${message}</p>`)

    }
}