class Tweet extends Component {
    constructor (props) {
        super(props)
        this.state = {
            view:undefined
        }
    }
    
    render() {
        return <section className="tweet">
            <h1>Feed</h1>
            <Tweets email={this.props.email}/>
        </section>

    }
}    