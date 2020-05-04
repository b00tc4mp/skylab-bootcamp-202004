const { Component } = React

class Results extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <section className="results">
            {this.props.user.length ?
                <ul>{this.props.user.map(({ name, surname, username, following }) =>
                    <li>{`${name} ${surname} (${username})`} {
                        typeof following !== 'undefined' ?
                            <button className="results__button" onClick={() => this.props.onSubmitFollowing(username)}>
                                {following ? 'unfollow' : 'follow'}

                            </button>
                            :
                            undefined
                    }
                    </li>
                )}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />}
        </section>
    }
}