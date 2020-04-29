function eco(query, callback) {
  debugger;
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://skylabcoders.herokuapp.com/proxy?url=https://www.ecosia.org/search?q=${query}`
  );

  const queryResults = [];

  xhr.onload = function () {
    const parser = new DOMParser();

    const doc = parser.parseFromString(this.responseText, "text/html");
    console.log(this.responseText);

    const results = doc.querySelectorAll(".result-body");

    results.forEach((result) => {
      const title = result.querySelector(".result-title");
      console.log(title);

      // const content = result.querySelector(".result-snippet");
      const content = result.querySelector("p");
      console.log(content);
      const { href: link } = result.querySelector(".result-url");
      console.log(link);
      queryResults.push({
        title: title.innerText,
        description: content.innerText,
        link: link,
      });
    });
    callback(queryResults);
  };

  xhr.onerror = function (error) {
    console.error(error);
  };

  xhr.send();
}
