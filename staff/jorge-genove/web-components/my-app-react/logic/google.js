function googleSearch(googleQuery, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${googleQuery}`
  );

  xhr.addEventListener('load', function () {
    //console.log(this.responseText)

    const parser = new DOMParser();

    const doc = parser.parseFromString(this.responseText, "text/html");

    const results = doc.querySelectorAll(".rc");
    const appends = [];
    results.forEach((result) => {
      const title = result.querySelector(".LC20lb").innerHTML;

      const content = result.querySelector(".st").innerHTML;

      const { href: link } = result.querySelector(".r > a");

      appends.push ({ title, content, link })

     
    });
    callback(undefined, appends);
  });

  xhr.addEventListener("error", () => {
    callback(new Error("network error"));
  });

  xhr.send();
}
