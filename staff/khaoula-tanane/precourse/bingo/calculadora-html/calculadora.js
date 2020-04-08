var screenElement = document.getElementById('textview')

function addValue(value){
    screenElement.innerText += value
}

function overWriteValue(value) {
    screenElement.innerText = value
}

function insert(value){
    addValue(value)
}


function equal(){

    
    if (screenElement.innerText.lastIndexOf('+') === screenElement.innerText.length -1 || screenElement.innerText.lastIndexOf('-') === screenElement.innerText.length -1 || screenElement.innerText.lastIndexOf('*') === screenElement.innerText.length -1 || screenElement.innerText.lastIndexOf('/') === screenElement.innerText.length -1){
        return alert('Please, complete your operation!')
    }
    
    if (screenElement.innerText.includes('+') || screenElement.innerText.includes('*') || screenElement.innerText.includes('/') || screenElement.innerText.includes('-')  ){
        var result = eval(screenElement.innerText);


        if(!Number.isInteger(result)){

            result = result.toFixed(3);
        }

        return overWriteValue(result)
    }


    var squareRoot = screenElement.innerText;

    squareRoot = Math.sqrt(squareRoot)

    if(!Number.isInteger(squareRoot)){

        squareRoot = squareRoot.toFixed(3);
    }


    return overWriteValue(squareRoot)


}
function clean(){
    overWriteValue('')
}

function back(){
    overWriteValue(screenElement.innerText.substring(0, screenElement.innerText.length -1)) 
}
