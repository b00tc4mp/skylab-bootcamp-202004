const {Component} = React;


class Google extends Component{
    constructor(){
        super()

        this.state ={
            results:undefined,
        }
    }

handleSubmit= (event) =>{
    event.preventDefault();
    let { query } = event.target

    query = query.value
    this.props.onSubmit(query);
}


render(){
    return <>
    <section className="search">
    <form className='search__form' onSubmit={this.handleSubmit}>
        <img className='search__img' src='https://pngimage.net/wp-content/uploads/2018/06/google-imagens-png-8.png'/> 
        <div className='search__container'>
        <input className='search__input' type="text" name="query" required/>
            <button className='search__button' >🔍</button>
        </div>    
    </form>
    {this.props.results && <GoogleResults results={this.props.results}/>}
    </section>
    </>
    }
}