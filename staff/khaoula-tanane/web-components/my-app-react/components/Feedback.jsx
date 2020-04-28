// class Feedback extends Component {
//     constructor(message, level) {
//         super(`<p class="feedback feedback--${level}">${message}</p>`)
//     }
// }

function Feedback({ message, level }) {
    return <p className={`feedback feedback--${level}`}>{message}</p>
}

