function extractSemanticHtml(element, depth) {
    for (var k = 0; k < element.children.length; k++) {
        var child = element.children[k]

        if (!isNonSemanticTag(child))
            console.log(getTabs(depth) + '<' + child.tagName +'>')

        extractSemanticHtml(child, depth + 1)

        if (!isNonSemanticTag(child) && !isSelfClosingElement(child))
            console.log(getTabs(depth) + '</' + child.tagName +'>')
    }
}

function getTabs(num) {
    var tabs = ''

    for (var i = 0; i < num; i++)
        tabs += '\t' // tabs = tabs + '\t'

    return tabs
}

var SELF_CLOSING_TAGS = ['BR', 'IMG', 'INPUT']

function isSelfClosingElement(element) {
    var itIs = false

    for (var i = 0; i < SELF_CLOSING_TAGS.length && !(itIs = element.tagName === SELF_CLOSING_TAGS[i]); i++);

    return itIs
}

var NON_SEMANTIC_TAGS = ['META', 'LINK', 'SCRIPT', 'STYLE', 'SPAN', 'DIV', 'FONT', 'BR']

function isNonSemanticTag(element) {
    var itIs = false

    for (var i = 0; i < NON_SEMANTIC_TAGS.length && !(itIs = element.tagName === NON_SEMANTIC_TAGS[i]); i++);

    return itIs
}


extractSemanticHtml(document, 0)

