class News extends Component{
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.onSubmit()
    }

    render(){
        return<section className="search">
        <img className='search__img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAVbcnhPYct1ZwEb_t97gpynVds1gIEAABv6dPv3azVrdXwoYM&usqp=CAU'/> 
        <ResultsNews results={this.props.results}/>
    </section>
    }
}