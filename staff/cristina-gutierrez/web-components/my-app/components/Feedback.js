
function Home (user, callback) {
    const temp = document.createElement('div')
    
    temp.innerHTML = ``

    const container = temp.firstChild;

    const button = container.querySelector("button");
    
    button.addEventListener("click", function() {
        callback()
    });

    return container;
};