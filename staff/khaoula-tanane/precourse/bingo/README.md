# SkyBingo

SkyBingo is a simple console game that generates a cardboard of random numbers, three rows of five , and keeps generating another number to see if it matches the ones that already exist on the cardboard, if that's the case, it replaces the number with an 'X'. The main objective is to line up (one row) or complete the entire carton.

## Functional description

- Create random numbers

    ```js
        getRandomArbitrary(min,max)
    ```

- Generate cardboard, three rows, five numbers each
    ```js
        let myCards = [
            [
            getRandomArbitrary(1, 15),
            ...
            ],
            [
            getRandomArbitrary(1, 15),
            ...
            ],
            [
            getRandomArbitrary(1, 15),
            ...
            ]
        ];
  
    ```
- Play fucntion: 

    - Generate random number

    - Replace the number with an 'X' number if matches  
    
    - Check line

    - Replay or Print 'Game over' message

    - //TODO refactor