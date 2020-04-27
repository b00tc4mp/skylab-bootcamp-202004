
function google(query, callback) {
    var xhr = new XMLHttpRequest();
  
    xhr.open("GET",`https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${query}`);

    xhr.onload = function () {
      const parser = new DOMParser();
  
      const doc = parser.parseFromString(this.responseText, "text/html");
  
      const results = doc.querySelectorAll(".rc");

      const queryResults = [];
  
      results.forEach((result) => {
        const title = result.querySelector(".LC20lb").innerText
        const content = result.querySelector(".st").innerText
        const { href: link } = result.querySelector(".r > a")
 
        queryResults.push({title, content, link})
      });

      callback(queryResults);

    };
  
    xhr.onerror = function (error) {
      console.error(error);
    }
    xhr.send();
  }