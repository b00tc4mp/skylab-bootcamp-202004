// simulates hooks
let launched = false

let state

function useState(initialValue) {
    state = typeof state === 'undefined' ? initialValue : state

    function setState(value) {
        state = value
    }

    return [state, setState]
}

// simulates a compo
function App() {
    const [score, setScore] = useState(0)

    function whatever() {
        console.log(score)
    }

    if (!launched) { 
        setTimeout(() => {
            whatever()
        }, 3000)

        launched = true
    }

    setScore(score + 1)

    return `<h1>${score}</h1>`
}


// simulates renderings after internal state change
let count = 0
const interval = setInterval(() => {

    console.log(App())

    count++ === 3 && clearInterval(interval)
}, 500)

// output
//<h1>0</h1>
//<h1>1</h1>
//<h1>2</h1>
//<h1>3</h1>
//0
