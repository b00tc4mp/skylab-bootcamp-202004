// var semantic=[ 
// "article",
// "aside",
// "details",
// "figcaption",
// "figure",
// "footer",
// "header",
// "main",
// "mark",
// "nav",
// "section",
// "summary",
// "time"];

var semantic=[ 
    "ARTICLE",
    "ASIDE",
    "DETAILS",
    "FIGCAPTION",
    "FIGURE",
    "FOOTER",
    "HEADER",
    "MAIN",
    "MARK",
    "NAV",
    "SECTION",
    "SUMMARY",
    "TIME"
];

var exceptions= [ 
    "HTML", 
    "HEAD", 
    "BODY"
];

var elements = document.getElementsByTagName('*');

function isSemantic(object, semantic){
    for (var i= 0; i<semantic.length; i++){
        if(object.tagName === semantic[i] ){
            return true;
        }
    }
    return false;
};

function isException(object, exceptions){
    for (var i= 0; i<exceptions.length; i++){
        if(object.tagName === exceptions[i] ){
            return true;
        }
    }
    return false;
};

// for (var i=0; i<elements.length; i++){
//     if(isSemantic(elements[i], semantic)){
//         elements[i].removeAttribute("class");
//         elements[i].removeAttribute("id");
//         elements[i].removeAttribute("style");
//         elements[i].removeAttribute("lang");
//         elements[i].innerText = '';
//     }
//     else if(isException(elements[i], exceptions)){
//         elements[i].removeAttribute("class");
//         elements[i].removeAttribute("id");
//         elements[i].removeAttribute("style");
//         elements[i].removeAttribute("lang");
        
//     }
//     else{ 
//         elementToEliminate = document.getElementsByTagName(elements[i].tagName)[0];
  
//         elementToEliminate.parentNode.removeChild(elementToEliminate);
//     }
// };

function floatSemantics(elements, semantic){
    for (var i=0; i<elements.length; i++){
        if(isSemantic(elements[i], semantic)){
            elements[i].parentNode.parentNode.appendChild(elements[i]);
            //nuevo-padre.appendChild(elemento-en-cuestion)
            debugger;
         
        }
        else{
            floatSemantics(elements[i], semantic);
            
        };
    };
};

//document.getElementById("someOtherDiv").appendChild(photo);

// element.parentNode.removeChild(element)


// documentHtml = JSON.parse(JSON.stringify(document));
// var arrayElements = []

// for(var i=0; i<semantic.length; i++){
//     var elements= document.getElementsByTagName(semantic[i]);
//     for(var j=0;j<elements.length;j++){
//         arrayElements.push(elements[j]);
//         debugger
//     }
// }


// arrayElements[4].removeAttribute("class")
// arrayElements[4].removeAttribute("id")



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