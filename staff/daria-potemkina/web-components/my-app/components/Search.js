class Search extends Component {
  constructor(query) {
    super(`<section class="search">
    <form>
      <input type="text" name="query">
      <button type="submit">🔍</button>
    </form>
    <form>
      <input type="text" name="googlequery">
      <button type="submit">Google Search 🧐</button>
    </form>
    <form>
      <input type="text" name="ecosiaquery">
      <button type="submit">Ecosia 🌳</button>
  </form>
  </section>`)

    const [form, googleForm, ecosiaForm] = this.container.querySelectorAll("form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const request = event.target.query.value

      query(request);

      googleForm.reset()
      ecosiaForm.reset()
    });

    googleForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const requestGoogle = event.target.googlequery.value

      query(undefined, requestGoogle);

      form.reset()
      ecosiaForm.reset()
    });

    ecosiaForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const requestEcosia = event.target.ecosiaquery.value

      query(undefined, undefined, requestEcosia);

      form.reset()
      googleForm.reset()
    });

  }
}
