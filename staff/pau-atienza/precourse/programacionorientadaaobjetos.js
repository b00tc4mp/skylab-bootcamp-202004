class Libro{
    constructor(titulo, autor, año, genero){
        this.titulo = titulo;
        this.autor = autor;
        this.año = año;
        this.genero = genero;
    };
};

let bookArray = []
let numberOfBooks = 0
do{
    bookTitle = undefined
    bookTitle = prompt('Introduce el título del libro.');
    if (bookTitle === ''){
        alert('Campo vacío. Vuelve a empezar.');
        continue
    }
    bookYear = undefined
    bookYear = prompt('Introduce el año de publicación del libro');
    if (bookYear === ''){
        alert('Campo vacío. Vuelve a empezar.');
        continue
    }
    else if ( isNaN(parseInt(bookYear)) || bookYear.length !== 4){
        alert('el año introducido no es un número o no tiene cuatro cifras. Vuelve a empezar.');
        continue;
    }
    bookAuthor = 0;
    bookAuthor = prompt('Introduce el autor del libro');
    if (bookAuthor === ''){
        alert('Campo vacío. Vuelve a empezar.');
        continue
    };
    bookGenre = 0;
    bookGenre = prompt('Introduce el género literario del libro');
    if (bookGenre === ''){
        alert('Campo vacío. Vuelve a empezar.');
        continue
    }
    else if (!(bookGenre.toLowerCase() === 'aventuras' || bookGenre.toLowerCase() ==='terror' || bookGenre.toLowerCase() ==='fantasía')){
        alert('el género introducido no es aventuras, terror o fantasía. Vuelve a empezar.'); 
        continue;
    }
    newBook = new Libro(bookTitle, bookAuthor, bookYear, bookGenre);
    bookArray.push(newBook);
    numberOfBooks += 1;
} while(numberOfBooks<3)

function showBooks(bookArray){
    for (element of bookArray){
        console.log(element)
    }
};

function showOrderedAuthors(){
    authors = [];
    for (book of bookArray){
        authors.push(book.autor)
    };
    console.log(authors.sort());
};