class Search extends Component{
    constructor(props){
        super()
        this.state={formSearch:""};
    }
    handleChangeSearch=(event)=>{
        event.preventDefault();
        this.setState({formSearch:event.target.value})
    }
    handleSearch=event=>{
        event.preventDefault();
        this.props.onSearch(this.state.formSearch);
    }
    render(){
        return <section>
            <input className="peter__input" type="text" name="query" placeholder="find..." required value={this.state.formSearch} onChange={this.handleChangeSearch}/>
            <button type="submit" className="peter__button" onClick={this.handleSearch}>🔎</button>
        </section>
    }
}