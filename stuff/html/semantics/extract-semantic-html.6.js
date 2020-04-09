printChildren(document, 0)

function printChildren(element, depth) {
    for (var k = 0; k < element.children.length; k++) {
        var child = element.children[k]

        console.log(getTabs(depth) + child.tagName)

        printChildren(child, depth + 1)
    }
}

function getTabs(num) {
    var tabs = ''

    for (var i = 0; i < num; i++)
        tabs += '\t' // tabs = tabs + '\t'

    return tabs
}

