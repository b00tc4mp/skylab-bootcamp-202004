class GoogleResults extends Component {
    constructor(headline, body, link) {
        super(`<li><a href="${link}" target="_blank">${headline}</a> <br> <br> ${body}</li>`)
    }
}