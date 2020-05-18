const { Component } = React

class SmartCompo extends Component {
    constructor(props) {
        super(props)

        this.state = { name: 'World' }
    }

    componentWillMount() {
        console.log('component will mount')
    }

    render() {
        console.log('render')

        return <h1>Hello, {this.state.name}!</h1>
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