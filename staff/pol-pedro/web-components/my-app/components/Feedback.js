class Feedback extends Component{
    
    constructor (message, level) {
        super(`<p class="feedback--${level}">${message}</p>`)
    }
}