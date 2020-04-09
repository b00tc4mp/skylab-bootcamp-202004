for (var i = 0; i < document.children.length; i++) {
    var element = document.children[i]

    console.log(element.tagName)

    printChildren(element, 1)
}

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

