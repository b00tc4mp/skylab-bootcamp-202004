for (var i = 0; i < document.children.length; i++) {
    var element = document.children[i]

    console.log(element.tagName)

    for (var j = 0; j < element.children.length; j++) {
        var child = element.children[j]

        console.log('\t' + child.tagName)
    }
}