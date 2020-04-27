const helloWorld = <h1>Hola, Mundo!</h1>

const names = ['Mary', 'Anna', 'John', 'Max', 'James']

const items = names.map(name => <li>{name}</li>)

const namesList = <ul>{items}</ul>

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange']

function List(props) {
    const { items } = props

    const _items = items.map(item => <li>{item}</li>)

    const list = <ul>{_items}</ul>

    return list
}

const colorList = List({ items: colors })

ReactDOM.render([helloWorld, namesList, colorList], document.getElementById('root'))