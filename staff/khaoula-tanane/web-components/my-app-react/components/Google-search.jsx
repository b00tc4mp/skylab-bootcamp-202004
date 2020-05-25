function SearchGoogle({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    let { query } = event.target;

    query = query.value;

    onSubmit(query);
  }



  return <section className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="google search" />
        <button>🔍</button>
      </form>
    </section>
  
}
