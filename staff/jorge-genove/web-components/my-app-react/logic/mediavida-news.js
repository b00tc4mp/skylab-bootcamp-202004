function printNews(callback) {
  debugger;
  const xrhmed = new XMLHttpRequest();

  xrhmed.open(
    "GET",
    `https://skylabcoders.herokuapp.com/proxy?url=https://www.mediavida.com`
  );

  xrhmed.addEventListener("load", function () {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.responseText, "text/html");
    const result = doc.querySelectorAll(".news-item");
    const results = [];

    result.forEach((output) => {
      const title = output.querySelector("h4 > a").innerText;
      const { href: link } = output.querySelector("h4 > a");
      const content = output.querySelector("p").innerText;
      let image = output.querySelector("img");
      image = image.dataset.src;
      results.push({ title, link, content, image });
    });
    callback(results);
  });

  xrhmed.send();
}
