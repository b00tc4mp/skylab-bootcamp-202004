const users = [
    {
        name: 'Manuel',
        surname: 'Barzi',
        email: 'manuelbarzi@gmail.com',
        password: '123123123',
        tweets: [{
            message: 'Hola mundo',
            date: new Date
            },
            {
                message: 'Donde estan las gatas',
                date: new Date
            },
            {
                message: 'Porque me gusta el brocoli',
                date: new Date
            }, 
        ],
        following:['pepito@grillo.com', 'andy@garcia.com']
    },

    {
        name: 'Pepito',
        surname: 'Grillo',
        email: 'pepito@grillo.com',
        password: '123123123',
        tweets: [{
            message: 'adios mundo',
            date: new Date
            },
            {
                message: 'Donde estan los perros para no discriminar sesos',
                date: new Date
            },
            {
                message: 'Porque es es sano',
                date: new Date
            }, 
        ],
    },

    {
        name: 'Andy',
        surname: 'Garcia',
        email: 'andy@garcia.com',
        password: '123123123',
        tweets: [{
            message: 'buenas tardes mra politishian',
            date: new Date
            },
            {
                message: 'viva el vino',
                date: new Date
            },
            {
                message: 'los catalanes hacemos cosas',
                date: new Date
            }, 
        ],
    }
]


// {
// 	"name": "aaa",
// 	"surname": "asdasdasd",
// 	"age": 3.1415,
// 	"username": "alejandro.mascort177@hotmail.com",
// 	"password": "123123123",
// 	"tweets": [
// 						{
// 								"message": "Hola mundo",
// 								"date": "12:02 sabado"
//             },
//             {
//                 "message": "Hola mundo",
//                 "date": "12:03 sabado"
//             },
//             {
//                 "message": "Hola mundo",
//                 "date": "12:04 sabado"
//             }
//         ]
// }