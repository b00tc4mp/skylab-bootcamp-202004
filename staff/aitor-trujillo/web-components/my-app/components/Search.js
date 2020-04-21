function Search(query) {
  const temp = document.createElement("div");

  temp.innerHTML = `<section class="search">
    <form>
        <input type="text" name="query">
        <button type="submit">🔍</button>
    </form>
</section>`;

  const container = temp.firstChild;

  const form = container.querySelector("form");

  let feedback;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const request = e.target.query.value; //pepito

    try {
      query(request);
      cleanError();
    } catch (error) {
      if (!feedback) {
        feedback = Feedback(error.message, "warning");

        container.append(feedback);
      } else feedback.innerText = error.message;
    }
  });

  function cleanError() {
    if (feedback) {
      container.removeChild(feedback);
      feedback = undefined;
    }
  }

  return container;
}
