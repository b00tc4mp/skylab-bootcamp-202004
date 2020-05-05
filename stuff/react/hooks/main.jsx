const names = ['Mary', 'Anna', 'John', 'Max', 'James']

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange']

const { useState, useEffect } = React

function List(props) {
    const { items } = props

    const _items = items.map(item => <li key={item}>{item}</li>)

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

function Header({ view, onChangeView }) {
    const [clicked, setClicked] = useState(0)

    useEffect(() => {
        console.log('view changed', view)
    }, [view])

    clicked && console.log('clicked on', clicked)

    return <header>
        <h1>Header</h1>
        <nav>
            <ul>
                <li>
                    <a className={`header-link ${view === 'home' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        setClicked(clicked + 1)
                        onChangeView('home')
                    }}>Home</a>
                </li>

                <li>
                    <a className={`header-link ${view === 'about' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        setClicked(clicked + 1)
                        onChangeView('about')
                    }}>About</a>
                </li>

                <li>
                    <a className={`header-link ${view === 'contact' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        setClicked(clicked + 1)
                        onChangeView('contact')
                    }}>Contact</a>
                </li>
            </ul>
        </nav>
    </header>
}

function Home() {
    useEffect(() => {
        console.log('mount')

        return () => console.log('unmount')
    }, [])

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
    const [view, setView] = useState('home')

    useEffect(() => {
        console.log('update')
    })

    function handleChangeView(view) {
        setView(view)
    }

    return <>
        <Header view={view} onChangeView={handleChangeView} />

        {view === 'home' && <Home />}
        {view === 'about' && <About />}
        {view === 'contact' && <Contact />}
    </>
}
ReactDOM.render(<App />, document.getElementById('root'))