class Results extends Component{
    constructor(props){
        super();
        this.state = {
            view: props.view,
            userResults: props.userResults
        }
    }//Usa this.props porque no se actualizaba si no lo hacía
    render(){
        return <section className="results">
            <h1>{this.props.view}</h1>
            {this.renderResults(this.props.view)}

        </section>
    }
    //Callbacks que se van pasando
    handleOnFollow=(id)=>{
        this.props.onFollow(id);
    }

    renderResults(view){
        switch(view){
            case "profile":
                //Muestra todos los tweets del usuario logeado
                return <section className="pete__list">
                    { 
                    
                    this.props.userTweets ?
                    
                    <ul>{this.props.userTweets.map((value) => <Tweet tweet={value} user={this.props.user}/> )}</ul>
                    : <h2>No se ha encontrado nada</h2>
                    }
                </section>
                
            case "discover":
                //Saca una lista con todos los usuarios
                return <section className="pete__list">
                    <Search onSearch={this.props.onSearch}/>
                    { 
                    this.props.discoverResults ?
                    <ul>{this.props.discoverResults.map((value) => <User user={value} onFollow={this.handleOnFollow}/> )}</ul>
                    : <h2>No se ha encontrado nada</h2>
                    }
                    
                </section>
                
            case "following":
                //Saca una lista con todos los usuarios que está siguiendo
                return <section className="pete__list">
                    {this.props.followingResults ?
                    <ul>{this.props.followingResults.map((value) => <User user={value} onFollow={this.handleOnFollow}/> )}</ul>
                    : <h2>No se ha encontrado nada</h2>}
                </section>
                
                
                
            case "follower":
                //Saca una lista con los usuarios que le siguen
                return <section className="pete__list">
                    {this.props.followersResults ?
                    <ul>{this.props.followersResults.map((value) => <User user={value} onFollow={this.handleOnFollow}/> )}</ul>
                    : <h2>No se ha encontrado nada</h2>}
                </section>
                
            case "feed":
                //Crea una lista con los tweets de todos los usuarios que sigue
                return <section className="pete__list">
                    { 
                    
                    this.props.feedTweets ?
                    
                    <ul>{this.props.feedTweets.map((value) => <Tweet tweet={value.tweet} user={value.user}/> )}</ul>
                    : <h2>No se ha encontrado nada</h2>
                    }
                </section>
                
            case "likes":
                //Lista con todos los tweets a los que el usuario le ha dado a like
                break;
            case "news":
                //Lista con las noticias del diario de Navarra
                return <section className="pete__list">
                    { 
                    
                    this.props.newsResults ?
                    
                    <ul>{this.props.newsResults.map((value) => <News news={value}/> )}</ul>
                    : <h2>No se ha encontrado nada</h2>
                    }
                </section>
                
        }
    }
}