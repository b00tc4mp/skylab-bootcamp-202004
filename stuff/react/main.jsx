'use strict'

const names = ['Mary', 'Anna', 'John', 'Max', 'James']

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange']

function List(props) {
    console.log(0);
    const { items } = props

    const _items = items.map(item => <li>{item}</li>)

    const list = <ul>{_items}</ul>

    return list
}

function PeopleAndColors(props) {
    const { colors, people } = props

    // return <section>
    //     <List items={people} />
    //     <List items={colors} />
    // </section>

    return <>
        <List items={people} />
        <List items={colors} />
    </>
}

const { Component } = React

function Header({ view, onChangeView }) {
    return <header>
        <nav>
            <ul>
                <li>
                    <a className={`header-link ${view === 'home' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()
                        console.log(1);
                        onChangeView('home')
                    }}>Home</a>
                </li>

                <li>
                    <a className={`header-link ${view === 'about' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        onChangeView('about')
                    }}>About</a>
                </li>

                <li>
                    <a className={`header-link ${view === 'contact' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        onChangeView('contact')
                    }}>Contact</a>
                </li>
            </ul>
        </nav>
    </header>
}

function Home() {
    return <>
        <h1>Home</h1>

        <PeopleAndColors colors={colors} people={names} />
    </>
}

function About() {
    return <h1>About</h1>
}

function Contact() {
    return <h1>Contact</h1>
}

class App extends Component {
    debugger
    constructor() {
        super()

        this.state = {
            view: 'home'
        }
        console.log(1);
        //this.handleChangeView = this.handleChangeView.bind(this)
    }

    // handleChangeView(view) {
    //     this.setState({ view })
    // }

    handleChangeView = view => {
        return this.setState({ view })
    }
   
    render() {
        return <>
            console.log(2);
            <Header view={this.state.view} onChangeView={this.handleChangeView} />
            {this.state.view === 'home' && <Home />}
            {this.state.view === 'about' && <About />}
            {this.state.view === 'contact' && <Contact />}
        </>
    }
}
ReactDOM.render(<App />, document.getElementById('root'))