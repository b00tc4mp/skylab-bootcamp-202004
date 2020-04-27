const helloWorld = React.createElement('h1', undefined, 'Hola, Mundo!')

const names = ['Mary', 'Anna', 'John', 'Max', 'James']

const items = names.map(name => React.createElement('li', undefined, name))

const namesList = React.createElement('ul', undefined, items)

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange']

function List(props) {
    const { items } = props

    const _items = items.map(item => React.createElement('li', undefined, item))

    const list = React.createElement('ul', undefined, _items)

    return list
}

const colorList = List({ items: colors })

ReactDOM.render([helloWorld, namesList, colorList], document.getElementById('root'))