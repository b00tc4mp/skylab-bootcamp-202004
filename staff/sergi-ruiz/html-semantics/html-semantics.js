function extractSemanticHtml(element, depth) {
    var html = '';

    for (var k = 0; k < element.children.length; k++) {
        var child = element.children[k];

        if (!isNonSemanticTag(child))
            html += getTabs(depth) + '<' + child.tagName + '>\n';

        if (!isSelfClosingElement(child))
            html += extractSemanticHtml(child, depth + 1);

        if (!isNonSemanticTag(child) && !isSelfClosingElement(child))
            html += getTabs(depth) + '</' + child.tagName + '>\n';

    }

    return html;
}

function getTabs(num) {
    var tabs = ''

    for (var i = 0; i < num; i++)
        tabs += '\t' // tabs = tabs + '\t';

    return tabs;
}

var SELF_CLOSING_TAGS = ['BR', 'IMG', 'INPUT']

function isSelfClosingElement(element) {
    return isOneOfTheseTags(element, SELF_CLOSING_TAGS)
}

var NON_SEMANTIC_TAGS = ['META', 'LINK', 'SCRIPT', 'STYLE', 'SPAN', 'DIV', 'FONT', 'BR', 'NOSCRIPT']

function isNonSemanticTag(element) {
    return isOneOfTheseTags(element, NON_SEMANTIC_TAGS)
}

function isOneOfTheseTags(element, tags) {
    var itIs = false;

    for (var i = 0; i < tags.length && !(itIs = element.tagName === tags[i]); i++);

    return itIs;

}

extractSemanticHtml(document, 0);