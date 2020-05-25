class News extends Component{
    constructor(props){
        super()
        this.state={link: props.news[1]}
    }
    openLink=(event)=>{
        window.open(this.state.link,"_blank")
    }
    render(){
        return <section className="pete__message" onClick={this.openLink}>
            <h2>{this.props.news[0]} </h2>
            <p>{this.props.news[2]}</p>

        </section>
    }
}