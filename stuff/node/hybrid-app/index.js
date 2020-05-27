const express = require('express')
const { name, version } = require('./package.json')

// data
const data = ['bananas', 'potatoes', 'apples', 'oranges', 'jack fruits', 'cocos']

// logic
function search(query) {
    return data.filter(item => item.includes(query))
}

const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

app.get('/search', (req, res) => {
    const { query: { q }} = req

    const items = search(q)

    res.render('index', { query: q, items })
})

app.listen(8080, () => console.log(`${name} ${version} running`))