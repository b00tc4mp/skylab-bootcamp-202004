class Search extends Component {
  constructor(query) {
    super(`<section class="search">
    <form>
        <input type="text" name="query">
        <button type="submit">🔍</button>
    </form>
  </section>`)

    const form = this.container.querySelector("form");

    // let feedback;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const request = event.target.query.value;

      query(request);

      //   try {
      //     query(request);
      //     // cleanError();
      //   } catch (error) {
      //     if (!feedback) {
      //       feedback = Feedback(error.message, "warning");

      //       container.append(feedback);
      //     } else feedback.innerText = error.message;
      //   }
    });

    // function cleanError() {
    //   if (feedback) {
    //     container.removeChild(feedback);
    //     feedback = undefined;
    //   }
    // }

  }
}
