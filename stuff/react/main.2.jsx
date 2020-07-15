const names = ['Mary', 'Anna', 'John', 'Max', 'James']

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange']

function List(props) {
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

class Header extends Component {
    constructor() {
        super()

        this.state = {
            body: 'home'
        }
    }

    render() {
        return <header>
            <nav>
                <ul>
                    <li>
                        <a className={`header-link ${this.state.body === 'home' ? 'header-link--active' : ''}`} href="" onClick={event => {
                            event.preventDefault()

                            this.setState({ body: 'home' })
                        }}>Home</a>
                    </li>

                    <li>
                        <a className={`header-link ${this.state.body === 'about' ? 'header-link--active' : ''}`} href="" onClick={event => {
                            event.preventDefault()

                            this.setState({ body: 'about' })
                        }}>About</a>
                    </li>

                    <li>
                        <a className={`header-link ${this.state.body === 'contact' ? 'header-link--active' : ''}`} href="" onClick={event => {
                            event.preventDefault()

                            this.setState({ body: 'contact' })
                        }}>Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    }
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

function App() {
    return <>
        <Header />

    </>
}

ReactDOM.render(<App />, document.getElementById('root'))