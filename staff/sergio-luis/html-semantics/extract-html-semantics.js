// var semantics = []
// var semanticsTagClosed = ['BODY', 'HTML', 'HEAD', "ARTICLE", "AUDIO", "BUTTON", "FORM", "VIDEO", "ASIDE", "DETAILS", "FIGCAPTION", "FIGURE", "FOOTER", "HEADER", "IMG", "MAIN", "MARK", "NAV", "SECTION", "SUMMARY","TIME"];
// var semanticsTag = ['BODY', 'HTML', 'HEAD', "ARTICLE", "AUDIO", "BUTTON", "FORM", "VIDEO", "ASIDE", "DETAILS", "FIGCAPTION", "FIGURE", "FOOTER", "HEADER", "MAIN", "MARK", "NAV", "SECTION", "SUMMARY","TIME"];

// function semantic(tag) {
//     if(semanticsTagClosed.includes(tag.tagName)){
//         semantics.push(`\n <${tag.tagName.toLowerCase()}>`)  
//   }  
//     for (var element of tag.children) {
//         semantic(element)
//     } 
//     if(semanticsTag.includes(tag.tagName)){
//         semantics.push(`</${tag.tagName.toLowerCase()}>\n`);
//     }
//     return semantics.join("");
// }

// semantic(document.children[0]);


var semanticTags = ['IMG', 'HTML', 'HEAD', 'BODY', 'HEADER', 'NAV', 'ARTICLE', 'SECTION', 'ASIDE', 'FOOTER', 'MAIN']
var tagsWithoutChildren = ['IMG'];​
var documentChildren = document.children
var template = '';​
function extractHtmlSemantics(children) {​
    for (var i = 0; i < children.length; i++) {​
        var currentChild = children[i]
        var currentChildName = currentChild.nodeName​
        if (semanticTags.includes(currentChildName)) {
            template += `\n<${currentChildName.toLowerCase()}>`

            extractHtmlSemantics(currentChild.children)​
            if (tagsWithoutChildren.includes(currentChildName)) {
                template += '\n'
            } else {
                template += `</${currentChildName.toLowerCase()}>\n`
            }
        } else {
            extractHtmlSemantics(currentChild.children)
        }
    }​
}​
extractHtmlSemantics(documentChildren)
console.log(template)

// Recrusividad

// function extractSemanticHtml(element, depth) {
//     for (var k = 0; k < element.children.length; k++) {
//         var child = element.children[k]

//         if (!isNonSemanticTag(child))
//             console.log(getTabs(depth) + '<' + child.tagName + '>')

//         extractSemanticHtml(child, depth + 1)

//         if (!isNonSemanticTag(child) && !isSelfClosingElement(child))
//             console.log(getTabs(depth) + '</' + child.tagName + '>')
//     }
// }

// function getTabs(num) {
//     var tabs = ''

//     for (var i = 0; i < num; i++)
//         tabs += '\t' // tabs = tabs + '\t'

//     return tabs
// }

// var SELF_CLOSING_TAGS = ['BR', 'IMG', 'INPUT']

// function isSelfClosingElement(element) {
//     return isOneOfTheseTags(element, SELF_CLOSING_TAGS)
// }

// var NON_SEMANTIC_TAGS = ['META', 'LINK', 'SCRIPT', 'STYLE', 'SPAN', 'DIV', 'FONT', 'BR', 'NOSCRIPT']

// function isNonSemanticTag(element) {
//     return isOneOfTheseTags(element, NON_SEMANTIC_TAGS)
// }

// function isOneOfTheseTags(element, tags) {
//     var itIs = false

//     for (var i = 0; i < tags.length && !(itIs = element.tagName === tags[i]); i++);

//     return itIs

// }

// extractSemanticHtml(document, 0)


// Exemplo en marcha
var arrSemantics = '';

function extractSemantics(element) {
    for (var i = 0; i < element.children.length; i++) {
        var child = element.children[i];
        if (!noSemantics(child)) {
            arrSemantics+='<' + element.children[i].tagName + '>\n'
        }

        extractSemantics(child);
        if (!noSemantics(child)) {
            arrSemantics+='</' + element.children[i].tagName + '>\n'
        }
    }

}
var arrNoSemantics = ['DIV', 'META', 'LINK','SPAN','STYLE','A','LI','NOSCRIPT','SCRIPT'];

function noSemantics(element) {
    var resp = false;
    for (var noSemantic of arrNoSemantics) {
        if (noSemantic === element.tagName) {
            resp = true;
        }
    }
    return resp
}
var arrNoCloseTag = ['BR', 'INPUT', 'LINK','SPAN','STYLE','A','LI','NOSCRIPT','SCRIPT'];

function noSemantics(element) {
    var resp = false;
    for (var noSemantic of arrNoSemantics) {
        if (noSemantic === element.tagName) {
            resp = true;
        }
    }
    return resp
}
extractSemantics(document)
console.log(arrSemantics);