function ecosiaSearch(ecosiaQuery, callback) {
  const xrheco = new XMLHttpRequest();

  xrheco.open(
    "GET",
    `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${ecosiaQuery}`
  );

  xrheco.addEventListener("load", function () {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.responseText, "text/html");

    const result = doc.querySelectorAll(".card-web");
    const results = [];

    result.forEach((output) => {
      const title = output.querySelector(".result-title").innerHTML;

      const content = output.querySelector(".result-snippet").innerHTML;

      const { href: link } = output.querySelector(".result-snippet-link");

      results.push({ title, content, link });
    });
    callback(undefined, results);
  });

  xrheco.addEventListener("error", () => {
    callback(new Error("network error"));
  });

  xrheco.send();
}
