
/*var c = document.body.children;
function x(){
for (var i = 0; i < c.length; i++){
var tag = document.children[i].tagName('nav')
console.log(tag)
}}x()*/








function getChildrens(tag){debugger
if(arguments.length == 0){
var tag = document.children;
}else{
    tag = tag.children
}
console.log(tag[0].tagName);
getChildrens(tag);


}