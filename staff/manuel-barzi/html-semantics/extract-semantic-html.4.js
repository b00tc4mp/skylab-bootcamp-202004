for (var i = 0; i < document.children.length; i++) {
    var element = document.children[i]

    console.log(element.tagName)

    for (var j = 0; j < element.children.length; j++) {
        var child = element.children[j]

        console.log('\t' + child.tagName)

        printChildren(child, 2)
    }
}

function printChildren(element, depth) {
    for (var k = 0; k < element.children.length; k++) {
        var child = element.children[k]

        console.log(getTabs(depth) + child.tagName)
    }
}

function getTabs(num) {
    var tabs = ''

    for (var i = 0; i < num; i++)
        tabs += '\t' // tabs = tabs + '\t'

    return tabs
}

