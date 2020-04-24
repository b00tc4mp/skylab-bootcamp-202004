function googleSearch(googleQuery,onSearch) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", `https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?${googleQuery}`);

  xhr.onload = function () {
    //console.log(this.responseText)

    const parser = new DOMParser();

    const doc = parser.parseFromString(this.responseText, "text/html");

    const results = doc.querySelectorAll(".rc");
    const appends = []
    results.forEach((result) => {
      const title = result.querySelector(".LC20lb");

     // console.log(title.innerText);

      const content = result.querySelector(".st");

      //console.log(content.innerText);

      const { href: link } = result.querySelector(".r > a");

      const append = {title, content, link}
      
     appends.push(append)

      //console.log(link);
    });
  };

  xhr.onerror = function (error) {
    console.error(error);
  };

  xhr.send();

  onSearch(appends)
}
