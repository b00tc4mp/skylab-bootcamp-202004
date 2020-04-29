const { Component } = React

class Ecosia extends Component{
    constructor(props){
    super(props)
    
    this.state = {results : undefined}

    }
handleOnEcosia = (query) => {
    ecosiaSearch(query, (error,results) => {debugger
        this.setState({ results })
    })
}


    
render() {
    return <section className="ecosia">
        <h2>Ecosia</h2>
        <Search onSubmit={this.handleOnEcosia}/>
        {this.state.results && <EcosiaResults googleFind={this.state.results} />}
    </section >
}




   








}
