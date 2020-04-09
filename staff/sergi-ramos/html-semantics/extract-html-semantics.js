var semantic = [];

function extractHtml(tag) {
    debugger
    for (var i = 0; i < document.childNodes.length; i++) {
        if (typeof (document.childNodes[i].tagName) == 'string') {
            semantic.push(document.childNodes[i].tagName);
            if (document.childNodes[i].hasChildNodes) {
                for(var x = 0;document.childNodes[i].length; x++){
                extractHtml(document.childNodes[i])
                }
            }
        }

    }
}