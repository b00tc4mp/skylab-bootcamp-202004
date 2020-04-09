var htmlString = document.getElementsByTagName('html')[0].innerHTML;
var regexArray = /<(([a-z])+(\ |>))|<\/[a-z]+>/g
var regexTags = htmlString.match(regexArray);

var finalTags = [];

//trial 1
// regexTags.forEach(tag, index, array) {
//     if(tag.includes(' ')){
//         tag.replace(' ', '>');
//         finalResult.push(tag);
//     } else {
//         finalResult.push(tag);
//     }
// }

// trial 2
// var i = 0;
// regexTags.forEach(function(item,i,regexTags) {
//     item.replace(/' '/, /'>'/);
//     finalResult.push(item);
// });

//trial 3
// for (var finalTags in regexTags) {
//     if(finalTags.includes(' ')
//     }
// }

//trial 4
// function filterTags() {
//     var finalResult = htmlstring.forEach(element => {
//         htmlString.replace(" ", ">")
//     });
//     return finalResult
// }
// console.log(finalResult);

//trial 5
for (var i = 0; i < regexTags.length; i++) {
    if (regexTags[i].indexOf(' ') !== -1) {
        regexTags[i] = regexTags[i].slice(0, -1)
        regexTags[i] += '>';
    }
}

var semanticTags = ["<head>", "</head>", "<article>", "</article>", "<audio>", "</audio>", "<button>", "</button>", "<form>", "</form>", "<video>", "</video>", "<aside>", "</aside>", "<details>", "</details>", "<figcaption>", "</figcaption>", "<figure>", "</figure>", "<footer>", "</footer>", "<header>", "</header>", "<img>", "<main>", "</main>", "<mark>", "</mark>", "<nav>", "</nav>", "<section>", "</section>", "<summary>", "</summary>", "<time>", "</time>", "</summary>"];

regexTags.filter(function(tag) {
    if (semanticTags.includes(tag)) {
        return tag;
    }
});

var finalTags = [];
for (var j = 0; j < regexTags.length; j++) {
    if (semanticTags.includes(regexTags[j])) {
        finalTags.push(regexTags[j]);
    }
}

htmlpage = finalTags.join("");

var easyRead = document.getElementsByTagName('html')[0].innerHTML = htmlpage;