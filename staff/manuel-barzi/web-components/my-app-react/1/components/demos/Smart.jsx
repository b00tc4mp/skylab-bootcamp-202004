const { Component } = React
//import { Component } from 'react' // DOESN'T work yet in browsers by default

class Smart extends Component {
    constructor(props) {
        super(props)

        this.state = { name: 'World' }
    }

    componentWillMount() {
        console.log('component will mount')
    }

    render() {
        console.log('render')

        return <>
            <h1>Smart: Hello, {this.state.name}!</h1>
            
            <Dumb name={this.state.name} />
        </>
    }

    componentDidMount() {
        console.log('component did mount')
    }

    shouldComponentUpdate() {
        console.log('should component update')

        return false
    }

    componentWillReceiveProps(props, prevProps) {
        console.log('component will receive props', props, prevProps)
    }

    componentWillUpdate() {
        console.log('component will update')
    }

    componentDidUpdate() {
        console.log('component did update')
    }

    componentWillUnmount() {
        console.log('component will unmount')
    }
}