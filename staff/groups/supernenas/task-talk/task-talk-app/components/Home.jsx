 const {Component} = React;

 class Home extends Component {
    render () {
        return <section className="home">
        <div className="navigation__bar navigation__bar--upper">
            <div className="navigation__text ">Usuario</div>
            <button className="button__card button__card--inverted button__card--configuration">☰</button>
        </div>
        <div className="group__card group__card--preview">
        </div>
        </section>
    }
 }