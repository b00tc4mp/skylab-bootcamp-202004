const { Component } = React

class Ecosia extends Component{
    constructor(){
    super()
    
    this.state = {ecosiaFind : undefined}

    }
handleOnEcosia = (query) => {
    ecosiaSearch(query, (error,results) => {
        this.setState({ecosiaFind : results})
    })
}


    
render() {
    return <section className="ecosia">
        <h2>Ecosia</h2>
        <Search onSearch={this.handleOnEcosia}/>
        {this.state.ecosiaFind && <EcosiaResults googleFind={this.state.ecosiaFind} />}
    </section >
}




   








}
