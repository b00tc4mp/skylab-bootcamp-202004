
/*function extractHtmlSemantics() {
    
    var htmlTag = document.children[0]
    var headTag = htmlTag.children[0]
    var bodyTag = htmlTag.children[1]
    var semantics = ['HEADER','NAV', 'MAIN', 'ARTICLE', 'SECTION', 'ASIDE', 'FOOTER']


var bodyElements = bodyTag.children
for(var i=0; i < bodyElements.length; i++ ){

    var bodyElement = bodyElements[i]

    var nodeName = bodyElement.nodeName 


    if(semantics.includes(nodeName)){
        console.log(nodeName)
    }


   for(var j=0; j< bodyElement.children.length; j++){
    console.log(bodyElement.children)

    var bodyElementsChildren = bodyElement.children
    for(var k=0; k<bodyElementsChildren.length; k++){
        console.log(bodyElementsChildren[k])
        var bodyElementsNodeName = bodyElementsChildren[k].nodeName
        if(semantics.includes(bodyElementsNodeName)){
            console.log(bodyElementsNodeName)
        }
    }

   }
}


}
  
  extractHtmlSemantics()
*/
/*

var semanticTags = ['HTML', 'HEAD', 'BODY', 'HEADER', 'NAV', 'ARTICLE', 'SECTION', 'ASIDE', 'FOOTER', 'MAIN']

var documentChildren = document.children

var template = ''

function checkChildren(children) {
        for(var i = 0; i <= children.length; i++) {
            var bodyElement = children[i]
            if (bodyElement) {
                var bodyElementName = bodyElement.nodeName
                if (semanticTags.includes(bodyElementName)) {
                    template += `\n<${bodyElementName}>`

                    if(bodyElement.children) {
                        checkChildren(bodyElement.children)
                    }
                }
            }
            
        }
    }
    checkChildren(documentChildren)
    
    */


    
   var semanticTags = ['IMG', 'HTML', 'HEAD', 'BODY', 'HEADER', 'NAV', 'ARTICLE', 'SECTION', 'ASIDE', 'FOOTER', 'MAIN']
   var tagsWithoutChildren = ['IMG']
   
   var documentChildren = document.children
   var template = ''
   
   function extractHtmlSemantics(children){
   
           for(var i=0; i<children.length; i++){
   
               var currentChild = children[i]
               var currentChildName = currentChild.nodeName
   
               if(semanticTags.includes(currentChildName)){
                   template += `\n<${currentChildName.toLowerCase()}>`
                  
                   extractHtmlSemantics(currentChild.children)
   
                   if(tagsWithoutChildren.includes(currentChildName)){
                       template += '\n'
                   } else{
                       template += `</${currentChildName.toLowerCase()}>\n`
                   }
               }else{
                   extractHtmlSemantics(currentChild.children)
               }
           }
   
   }
   
   extractHtmlSemantics(documentChildren)
   console.log(template)
   
   
   
   // REFACTOR ES6

   /*
   let semanticTags = ['IMG', 'HTML', 'HEAD', 'BODY', 'HEADER', 'NAV', 'ARTICLE', 'SECTION', 'ASIDE', 'FOOTER', 'MAIN']
   let tagsWithoutChildren = ['IMG']
   
   let documentChildren = document.children
   let template = ''
   
   function extractHtmlSemantics(children){
   
       [...children].forEach(currentChild => {
           let currentChildName = currentChild.nodeName
   
           if(semanticTags.includes(currentChildName)){
               template += `\n<${currentChildName.toLowerCase()}>`
               
               extractHtmlSemantics(currentChild.children)
   
               template += (tagsWithoutChildren.includes(currentChildName)) ? '\n' : `</${currentChildName.toLowerCase()}>\n`
               
               return;
           }
           
           extractHtmlSemantics(currentChild.children)
       })
   
   
   }
   
   extractHtmlSemantics(documentChildren)
   console.log(template)
   */