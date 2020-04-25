function ecosiaSearch(ecosiaQuery, callback){
    const xrheco = new XMLHttpRequest();

    xrheco.open(
        "GET",`https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=${ecosiaQuery}`)


xrheco.addEventListener('load',function () {
    const parser = new DOMParser()
    const doc = parser.parseFromString(this.responseText, "text/html");

const result = doc.queryselectorAll()
const results = []

result.forEach((output) => {
    const title = output.queryselector().innerText;

    const content = output.queryselector().innerText

    const { href: link} = output.queryselector()
    
    results.push ({ title, content, link})
});
callback(undefined, results)
});

xrheco.addEventListener("error", () =>{
    callback(new Error("network error"))
});

xrheco.send()
}
