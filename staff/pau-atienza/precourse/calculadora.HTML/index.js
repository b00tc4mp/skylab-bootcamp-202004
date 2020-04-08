const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const zero = document.querySelector('.zero');

const div = document.querySelector('.div');
const times = document.querySelector('.times');
const minus = document.querySelector('.minus');
const add = document.querySelector('.add');
const dot = document.querySelector('.dot');

const ac = document.querySelector('.ac');
const c = document.querySelector('.c');

const equals = document.querySelector('.equals');

const screen = document.querySelector('.screen');

screen.textContent = '';

screen.addEventListener('keydown', 
    function stop(e){
        e.preventDefault();
    }
);

one.addEventListener('click',  
    function one(){
        if (screen.textContent.length < 17){
        screen.textContent = screen.textContent + '1';
        };
    } 
);

two.addEventListener('click', 
    function two(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '2';
            };
    }
);

three.addEventListener('click', 
    function three(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '3';
        };
    }
);

four.addEventListener('click', 
    function four(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '4';
        };    
    }
);

five.addEventListener('click', 
    function five(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '5';
        };
    }
);

six.addEventListener('click', 
    function six(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '6';
        };
    }
);

seven.addEventListener('click', 
    function seven(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '7';
        };    
    }
);

eight.addEventListener('click', 
    function eight(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '8';
        };    
    }
);

nine.addEventListener('click', 
    function nine(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '9';
        };    
    }
);

zero.addEventListener('click', 
    function zero(){
        if (screen.textContent.length < 17){
            screen.textContent = screen.textContent + '0';
        };    
    }
);

times.addEventListener('click', 
    function times(){
        var elements = screen.textContent.split('');
        var endsInNumber = !(isNaN(parseInt(elements[elements.length-1])));

        if(screen.textContent !== '' && endsInNumber === true && screen.textContent.length < 14){
            screen.textContent = screen.textContent + ' x ';
        }
    }
);

div.addEventListener('click', 
    function div(){
        var elements = screen.textContent.split('');
        var endsInNumber = !(isNaN(parseInt(elements[elements.length-1])));

        if(screen.textContent !== '' && endsInNumber === true && screen.textContent.length < 14){
            
            screen.textContent = screen.textContent + ' / ';
        }
    }
);

add.addEventListener('click', 
    function add(){
        var elements = screen.textContent.split('');
        var endsInNumber = !(isNaN(parseInt(elements[elements.length-1])))

        if(screen.textContent !== '' && endsInNumber === true && screen.textContent.length < 14){
            screen.textContent = screen.textContent + ' + ';
        }
    }
);

minus.addEventListener('click', 
    function minus(){
        var elements = screen.textContent.split('');
        var endsInNumber = !(isNaN(parseInt(elements[elements.length-1])))
        if(screen.textContent !== '' && endsInNumber === true && screen.textContent.length < 14){
            screen.textContent = screen.textContent + ' - ';
        }
    }
);

function isThereADot(array){
    for(i=0; i<array.length; i++){
        if (array[i] === '.'){
            return true
        }
    }
    return false
}

dot.addEventListener('click', 
    function dot(){
        var elements = screen.textContent.split('');
        var endsInNumber = !(isNaN(parseInt(elements[elements.length-1])))
        var lastNumber = screen.textContent.split(' ')[screen.textContent.split(' ').length-1];
        
        if(screen.textContent !== '' && endsInNumber === true && isThereADot(lastNumber) === false && screen.textContent.length < 16){
            screen.textContent = screen.textContent + '.';
        }
    }
);

ac.addEventListener('click', 
    function dot(){
            screen.textContent = '';
    }
);

c.addEventListener('click', 
    function c(){
        var elements = screen.textContent.split(' ');
        var newContent = ''
        for (i=0; i<elements.length-1; i++){
            newContent = newContent + ' ' + elements[i]
        };
        screen.textContent = newContent;
    }
);

equals.addEventListener('click', 
    function c(){
        var elements = screen.textContent.split(' ');
        console.log(elements)
        var endsInNumber = !(isNaN(parseInt(elements[elements.length-1])))
        if(screen.textContent !== '' && endsInNumber === true){
            var newElements = elements;
            for (i=1; i<elements.length-1; i++){
                for (j=1; j<newElements.length-1; j++){
                    if (newElements[j] === 'x' ){
                        result = parseFloat(newElements[j-1]) * parseFloat(newElements[j+1]);
                        newElements.splice(j-1, 3, result);
                        console.log(result)
                        console.log(newElements)
                        break
                    }
                    else if (newElements[j] === '/' ){
                        var result = parseFloat(newElements[j-1]) / parseFloat(newElements[j+1]);
                        newElements.splice(j-1, 3, result);
                        console.log(result)
                        console.log(newElements)
                        break
                    };
                };
            };

            for (i=1; i<elements.length-1; i++){
                for (j=1; j<newElements.length-1; j++){
                    if (newElements[j] === '+' ){
                        var result = parseFloat(newElements[j-1]) + parseFloat(newElements[j+1]);
                        newElements.splice(j-1, 3, result);
                        console.log(result)
                        console.log(newElements)
                        break
                    }
                    else if (newElements[j] === '-' ){
                        var result = parseFloat(newElements[j-1]) - parseFloat(newElements[j+1]);
                        newElements.splice(j-1, 3, result);
                        console.log(result)
                        console.log(newElements)
                        break
                    };
                };
            };

            screen.textContent = newElements[0];
        };
        
    }
);