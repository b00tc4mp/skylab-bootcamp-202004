var semantics = []

function semantic(tag) {
    if(tag.tagName == 'BODY' || tag.tagName == 'HTML' || tag.tagName == 'HEAD' || tag.tagName == "ARTICLE" || tag.tagName == "AUDIO" || tag.tagName == "BUTTON" || tag.tagName == "FORM" || tag.tagName == "VIDEO" || tag.tagName == "ASIDE" || tag.tagName == "DETAILS" || tag.tagName == "FIGCAPTION"  ||  tag.tagName == "FIGURE"  ||  tag.tagName == "FOOTER"  ||  tag.tagName == "HEADER"  ||   tag.tagName == "IMG"  ||  tag.tagName == "MAIN"  ||  tag.tagName == "MARK"  ||  tag.tagName == "NAV" || tag.tagName == "SECTION" || tag.tagName == "SUMMARY" || tag.tagName == "TIME"){
        semantics.push(`\n <${tag.tagName.toLowerCase()}>`)
  }
    for (var element of tag.children) {
        semantic(element)
    } 
     if (tag.tagName == 'BODY' || tag.tagName == 'HTML' || tag.tagName == 'HEAD' || tag.tagName == "ARTICLE"  ||  tag.tagName == "AUDIO" ||  tag.tagName == "BUTTON" ||   tag.tagName == "FORM"  ||  tag.tagName == "VIDEO" || tag.tagName == "ASIDE" || tag.tagName == "DETAILS" || tag.tagName == "FIGCAPTION"  ||  tag.tagName == "FIGURE" ||  tag.tagName == "FOOTER"  ||  tag.tagName == "HEADER" ||  tag.tagName == "MAIN"  ||  tag.tagName == "MARK"  ||  tag.tagName == "NAV"  ||  tag.tagName == "SECTION" || tag.tagName == "SUMMARY" || tag.tagName == "TIME") {
        semantics.push(`</${tag.tagName.toLowerCase()}>\n`);
    }
    return semantics.join("");
}

semantic(document.children[0]); 