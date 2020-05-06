const { useState } = React

function Results(props) {

        return <section className="results">
            {props.user.length ?
                <ul>{props.user.map(({ name, surname, username, following, id }) =>
                    <li key={id}>{`${name} ${surname} (${username})`} {
                        typeof following !== 'undefined' ?
                            <button className="results__button" onClick={() => props.onSubmitFollowing(username)}>
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