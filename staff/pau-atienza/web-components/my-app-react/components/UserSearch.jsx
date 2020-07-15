function UserSearch({handleSearchUsers}){

    return <section className="search--users">
            <form onSubmit = {(event) =>{event.preventDefault(); handleSearchUsers(event)}}>
                <input type="text" name="query"/>
                <button>🔍</button>
            </form>
        </section>
}