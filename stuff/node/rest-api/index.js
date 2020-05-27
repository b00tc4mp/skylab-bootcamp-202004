const express = require('express')
const { name, version } = require('./package.json')

const app = express()

// logic

function operate(operand1, operator, operand2) {
    let result

    switch (operator) {
        case 'add':
            result = operand1 + operand2
            break
        case 'sub':
            result = operand1 - operand2
            break
        case 'mul':
            result = operand1 * operand2
            break
        case 'div':
            result = operand1 / operand2
            break
    }

    return result
}

// presentation

// example: http://localhost:8080/-1/add/5 => 4
app.get('/:operand1/:operator/:operand2', (req, res) => {
    let { params: { operand1, operator, operand2 } } = req

    operand1 = Number(operand1)
    operand2 = Number(operand2)

    res.json({ result: operate(operand1, operator, operand2) })
})

app.listen(8080, () => console.log(`${name} ${version} running`))