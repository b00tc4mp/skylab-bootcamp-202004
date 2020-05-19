class Feedback extends Component{
    constructor(message,level){
        super(`<p class="feedback feddback--${level}">${message} </p>`)
    }
}