const { Component } = React

class Results extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            view: undefined
        })
    }
    handleList = (id) => {
        if(this.props.isFollowed){
        this.props.isFollowed.forEach((userId) => {
            if (id === userId) { return true }

        })
    }else{
        return false

    }
    }
    render() {
        return <section className="results">
            {this.props.user.length ?
                <ul>{this.props.user.map(({ name, surname, username, follow, id }) => <li>{`${name} ${surname} (${username})`}<button className="results__button" onClick={event => {
                    event.preventDefault()
                    this.props.onSubmitFollowing(username)

                }}>{this.handleList(id) ? 'unfollow' : 'follow'}</button></li>)}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />}
        </section>
    }
}