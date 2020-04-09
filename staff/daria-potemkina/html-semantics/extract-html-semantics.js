var semantics = []
var semanticsTagClosed = ['BODY', 'HTML', 'HEAD', "ARTICLE", "AUDIO", "BUTTON", "FORM", "VIDEO", "ASIDE", "DETAILS", "FIGCAPTION", "FIGURE", "FOOTER", "HEADER", "IMG", "MAIN", "MARK", "NAV", "SECTION", "SUMMARY","TIME"];
var semanticsTag = ['BODY', 'HTML', 'HEAD', "ARTICLE", "AUDIO", "BUTTON", "FORM", "VIDEO", "ASIDE", "DETAILS", "FIGCAPTION", "FIGURE", "FOOTER", "HEADER", "MAIN", "MARK", "NAV", "SECTION", "SUMMARY","TIME"];

function semantic(tag) {
    if(semanticsTagClosed.includes(tag.tagName)){
        semantics.push(`\n <${tag.tagName.toLowerCase()}>`)  
  }  
    for (var element of tag.children) {
        semantic(element)
    } 
    if(semanticsTag.includes(tag.tagName)){
        semantics.push(`</${tag.tagName.toLowerCase()}>\n`);
    }
    return semantics.join("");
}

semantic(document.children[0]);
