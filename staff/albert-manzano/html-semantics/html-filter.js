var htmlString = document.getElementsByTagName("html")[0].innerHTML;
// Faltaba añadir \ para que detectara todo el regex
var regex = /<(([a-z])+[0-9]*(\ |>))|(<\/[a-z]+>)/g;
var regexTags = htmlString.match(regex);
var tagList = [
  "<head>",
  "</head>",
  "<article>",
  "</article>",
  "<audio>",
  "</audio>",
  "<button>",
  "</button>",
  "<form>",
  "</form>",
  "<video>",
  "</video>",
  "<aside>",
  "</aside>",
  "<details>",
  "</details>",
  "<figcaption>",
  "</figcaption>",
  "<figure>",
  "</figure>",
  "<footer>",
  "</footer>",
  "<header>",
  "</header>",
  "<img>",
  "<main>",
  "</main>",
  "<mark>",
  "</mark>",
  "<nav>",
  "</nav>",
  "<section>",
  "</section>",
  "<summary>",
  "</summary>",
  "<time>",
  "</time>",
  "</summary>",
];

for (var i = 0; i < regexTags.length; i++) {
  if (regexTags[i].indexOf(" ") !== -1) {
    regexTags[i] = regexTags[i].slice(0, -1);
    regexTags[i] += ">";
  }
}

regexTags.filter(function (tag) {
  if (tagList.includes(tag)) {
    return tag;
  }
});

var semanticTags = [];
for (var j = 0; j < regexTags.length; j++) {
  if (tagList.includes(regexTags[j])) {
    semanticTags.push(regexTags[j]);
  }
}

htmlpage = semanticTags.join("");