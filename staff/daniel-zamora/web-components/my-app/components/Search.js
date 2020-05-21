class Search extends Component {
  constructor(onSearch) {
    super(`<section class="search">
    <form>
        <input type="text" name="query">
        <button>🔍</button>
    </form>
</section>`);

    const form = this.container.querySelector("form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const query = event.target.query.value;

      onSearch(query);
    });
  }
}
