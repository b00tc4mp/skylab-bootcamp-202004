function extractHtmlTree(element, depth) {
    for (var k = 0; k < element.children.length; k++) {
        var child = element.children[k]

        console.log(getTabs(depth) + '<' + child.tagName +'>')

        extractHtmlTree(child, depth + 1)

        if (!isSelfClosingElement(child))
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

extractHtmlTree(document, 0)

