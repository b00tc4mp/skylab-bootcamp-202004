// class Search extends Component {
//   constructor(query) {
//     super(`<section class="search">
//     <form>
//         <input type="text" name="query">
//         <button type="submit">🔍</button>
//     </form>
//   </section>`);

//     const form = this.container.querySelector("form");

//     // let feedback;

//     form.addEventListener("submit", function (event) {
//       event.preventDefault();

//       const request = event.target.query.value;

//       if (request.length) query(request);
//     });
//   }
// }

function Search({ query }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = e.target.query.value;

    query(request)
  }

  return <section className="search">
    <form onSubmit={handleSubmit}>
      <input type="text" name="query" />
      <button type="submit">🔍</button>
    </form>
  </section>

}