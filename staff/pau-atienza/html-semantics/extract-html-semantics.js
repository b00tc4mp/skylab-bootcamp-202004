//Los elementos que hemos definido como semanticos
var semantic=["ARTICLE",
"BODY",
"HTML",
"IMG",
"ASIDE",
"DETAILS",
"FIGCAPTION",
"FIGURE",
"FOOTER",
"HEADER",
"HEAD",
"MAIN",
"MARK",
"NAV",
"SECTION",
"SUMMARY",
"TIME"]

//los atributos que hay que borrar de los elementos
var atribute=["itemscope",
"itemtype",
"class",
"id",
"alt",
"data-src",
"src",
"loading",
"style",
"width",
"data-sizes",
"data-srcset",
"data-maxdpr",
"sizes",
"srcset",
"data-parallax-background-speed",
"role",
"itemprop",
"datetime",
"lang"]

//Mete todos los elementos de un documento en un mismo array
var elements=document.getElementsByTagName("*");

//Comprueba si el elemento está dentro de los semanticos
function isSemantic(ele) {
    for(var i=0;i<semantic.length;i++){
        if(ele.tagName==semantic[i] && ele.tagName!=null){
            return true;
        }
    }
    return false;
}

//Ordena a los elementos que se muevan en la jerarquía
function classify() {
    
    for(var i=elements.length-1;i>=0;i--){
        moveToSemantic(elements[i]);
    }
}

//Mueve el elemento hasta que es hijo de un elemento semantico
function moveToSemantic(ele) {
    if(ele.tagName!="HTML")
    {
        var oldEle=ele.parentElement;
        if(!isSemantic(oldEle)){
            oldEle.parentElement.appendChild(ele);
            moveToSemantic(ele);
        }
    }
}

//Remueve los elementos no semanticos del html
function removeNotSemantic() {
   for(var i=elements.length-1;i>=0;i--){
        if(!isSemantic(elements[i])){
            elements[i].parentNode.removeChild(elements[i]);
        }
    }
}

//limpia los campos sematicos
function clearSemantic() {
    for(var i=elements.length-1;i>=0;i--){
        if(isSemantic(elements[i])){
            for(var j=0;j<atribute.length;j++){
                elements[i].removeAttribute(atribute[j]);
            }
        }
    }
    return true;
}

//Funcion que hay que llamar desde la consola
function transformWeb() {
    //Primero saca a flote todas las funciones semanticas
    classify();
    //Una vez están a flote es seguro eliminar las no semanticas, así que las borra
    removeNotSemantic();
    //Ahora limpia toda la informacion sobrante
    clearSemantic();
}