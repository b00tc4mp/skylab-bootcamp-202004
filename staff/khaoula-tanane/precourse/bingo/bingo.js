function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  let myCards = [
    [
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15)
    ],
  
    [
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15)
    ],
  
    [
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15),
      getRandomArbitrary(1, 15)
    ]
  ];
  
  let total = 0;
  
  function playGame() {
    let newNumber = getRandomArbitrary(1, 15);
    total++;
    console.log(newNumber, "new number");
  
    myCards = myCards.map(group => {
      return group.map(number => {
        if (number === newNumber) return "X";
        return number;
      })
    });
  
  var line = 0;
    myCards.forEach((group, i) => {
      let firstNumber = group.find(card => {
        return !isNaN(card);
      });
    
      if (!firstNumber) {
        line++
        if(line === 1){console.log('LINE!!', i +1 );
      }
    }
    });
  
    console.table(myCards);
       
    if(line === 3){
      return console.log(`Congratulations you have completed the game with a total of ${total} balls!!!`)
        }
  

  
          let keepPlaying = confirm("Quieres generar una bola?");
          if (keepPlaying) {
            return playGame();
          } else {
            alert("Game over!");
          }
  }
  
  playGame();
  