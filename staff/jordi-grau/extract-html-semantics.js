<script type="text/javascript">

var arrEtiquetas = ['h1', 'h2', 'header'];
var text = [];
arrEtiquetas.forEach(etiqueta => {

  text.push(document.getElementsByTagName(etiqueta));
});

var result = [];
for (var i in text) {
  for (var j in text[i]) {
    result.push(text[i][j]);
  }
}
//Sergi!!!


for (element of document.children[0].children[0].children) {
  console.log(element.tagName);

};



for (element of document.children[0].children) {
  console.log(element.tagName);
};

var semantics = []

function semantic() {
  var arrTags = document.getElementsByTagName('*');

  for (var i = 0; i < arrTags.length; i++) {
    // if (arrTags[i] !== 'div' || arrTags[i] !== 'span') {
    callback(arrTags[i]);
    // arrTags[i].innerHTML = "";
    // arrTags[i].removeAttribute('class');
    // arrTags[i].removeAttribute('id');
    // }
  }
}
console.log(semantics)


function callback(tag) {
  for (var child of tag.children) {
    if (child.children) {
      callback(child)
    }
    semantics.push(child.tagName)
  }
}



result[0].removeAttribute("class");

//////////////////
var semanticTags = [];
var tagList2 = ["head", "article", "audio", "button", "form", "video", "aside", "details", "figcaption", "figure", "footer", "header", "img", "main", "mark", "nav", "section", "summary", "time"];
var htmlTags = document.getElementsByTagName("*");
var backToHtml = '';

function extractTags() {

  for (var i = 0; i < htmlTags.length; i++) {
    for (var j = 0; j < tagList2.length; j++) {
      if (htmlTags[i].tagName) {
        if (htmlTags[i].tagName == tagList2[j].toUpperCase()) {
          semanticTags[semanticTags.length] = htmlTags[i];
        }
      }
    }
  }
  return semanticTags;
  //=======>
  // semanticTags
  // var regexArray = /^<(([a-z])+(\ |>))|<\/[a-z]+>/g
  // var regexTags = htmlString.match(regexArray);
  // for (var i = 0; i < semanticTags.length; i++) {
  //     backToHtml += semanticTags[i].innerHTML;
  // }
  // return backToHtml;
}
extractTags();



// Sérgio
// 1- remover el contenido dentro del tag
var x = document.getElementsByTagName("h1");
for (var i = 0; i < x.length; i++) {
  x[i].innerHTML = "";
}

// 2- remover el contenido de classes
var x = document.getElementsByTagName("h1");
for (var i = 0; i < x.length; i++) {
  x[i].removeAttribute('class');
}
// 3- remover id's
var x = document.getElementsByTagName("h1");
for (var i = 0; i < x.length; i++) {
  x[i].removeAttribute('id');
}
// 4 - eliminar div y span ???







var semantics = []

function semantic(tag) {
  for (var child of tag.children) {
    if (child.children) {
      semantic(child)
    }
    if(child.tagName != 'div' || child.tagName != 'span'){
        semantics.push(child.tagName)
    }
    
  }
}
semantic(document.children[0])
console.log(semantics)






// <html>
// <head></head>
// <body>
// <div><header class="pepito"></header></div>
// <div><main><section class="fulanito"><img src="my-image.gif"></section><section></section></main></div>
// <div><footer id="menganito"></footer></div>
// </body>
// <html></html>

/*
<html>
<head></head>
<body>
<header></header>
<main><section><img></section><section></section></main>
<footer></footer>
</body>
<html>
*/
// j
var arrEtiquetas = ['h1', 'h2', 'header'];
var text = [];
arrEtiquetas.forEach(element => {
  text.push(document.getElementsByTagName(element));
});

var result = [];
for (var i in text) {
  for (var j in text[i]) {
    result.push(text[i][j]);
  }
}

.
result. [0].removeAttribute("class");

















var semantics = []

function semantic(tag) {

  for (var i = 0; i < document.childNodes.length; i++) {
    if (tag == undefined) {
      if (document.childNodes[i].tagName != undefined) {
        semantics.push(document.childNodes[i].tagName)
      }
      if (document.childNodes[i].hasChildNodes()) {
        semantic(document.childNodes[i])
      }

    } else {
      if (document.childNodes[i].tagName != undefined) {
        semantics.push(document.childNodes[i].tagName)
      }
      if (document.childNodes[i].hasChildNodes()) {
        semantic(document.childNodes[i])
      }
    }
  }
}






// codigo compañeros
var htmlString = document.getElementsByTagName('html')[0].innerHTML;
var regex = /<(([a-z])+[0-9]*(\ |>))|(<\/[a-z]+>)/g
var regexTags = htmlString.match(regex);
var tagList = ["<head>", "</head>", "<article>", "</article>", "<audio>", "</audio>", "<button>", "</button>", "<form>", "</form>", "<video>", "</video>", "<aside>", "</aside>", "<details>", "</details>", "<figcaption>", "</figcaption>", "<figure>", "</figure>", "<footer>", "</footer>", "<header>", "</header>", "<img>", "<main>", "</main>", "<mark>", "</mark>", "<nav>", "</nav>", "<section>", "</section>", "<summary>", "</summary>", "<time>", "</time>", "</summary>"];

for (var i = 0; i < regexTags.length; i++) {
  if (regexTags[i].indexOf(' ') !== -1) {
    regexTags[i] = regexTags[i].slice(0, -1)
    regexTags[i] += '>';
  }
}

regexTags.filter(function (tag) {
      if (tagList.includes(tag)) {
        return tag;
      }
    }


</script>
