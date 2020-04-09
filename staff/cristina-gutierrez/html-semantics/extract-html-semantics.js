var semanticTags = ['IMG', 'HTML', 'HEAD', 'BODY', 'HEADER', 'NAV', 'ARTICLE', 'SECTION', 'ASIDE', 'FOOTER', 'MAIN']
   var tagsWithoutChildren = ['IMG']

   var documentChildren = document.children;
   var template = ''

   function extractHtmlSemantics(children){

           for(var i=0; i<children.length; i++){

               var currentChild = children[i]
               var currentChildName = currentChild.nodeName

               if (semanticTags.includes(currentChildName)){
                   template += `\n<${currentChildName.toLowerCase()}>`

                   extractHtmlSemantics(currentChild.children)

                   if (tagsWithoutChildren.includes(currentChildName)){
                       template += '\n'
                   } else {
                       template += `</${currentChildName.toLowerCase()}>\n`
                   }
               } else {
                   extractHtmlSemantics(currentChild.children)
               }
           }

   };

   extractHtmlSemantics(documentChildren);
   console.log(template);