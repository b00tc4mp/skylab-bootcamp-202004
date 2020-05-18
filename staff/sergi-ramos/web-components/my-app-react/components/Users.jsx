const { useState } = React
function Users(props) {

    const [users, setUsers] = useState(undefined)
    const [query, setQuery] = useState(undefined)

    function handleSubmit(query) {
        console.log(query)

        searchUsers(query, props.token, props.following, (error, users) => {
            if (error) {console.log(error)} //TODO feedaback
            else {
                setUsers(users)
                setQuery(query)
            }
        })
    }
    function handleOnFollowing(username) {
        toggleFollowUser( username, props.token, (error) => { //TODO novale var
            if (error) console.log(error) //TODO feedback
            else handleSubmit(query)

        })
    }
        return <section className="users">
            <h2>Users</h2>
            <Search onSubmit={handleSubmit} />
            {users && <Results user={users} onSubmitFollowing={handleOnFollowing}  />}

        </section>

}


