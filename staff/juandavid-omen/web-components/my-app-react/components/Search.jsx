function Search({ onSubmit, query }) {
    function handleSubmit(event) {
        event.preventDefault();

        let { query } = event.target;

        query = query.value;

        onSubmit(query);
    }

    return <section className="search">
        <form onSubmit={handleSubmit}>
            <input type="text" name="query" defaultValue={query} />
            <button>🔍</button>
        </form>
    </section>
};