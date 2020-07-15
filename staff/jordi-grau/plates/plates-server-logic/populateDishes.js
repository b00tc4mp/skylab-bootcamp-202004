const {mongoose, models: { Dish }} = require('plates-data')

let plats = [
    {name: 'tortilla de patata' , tags: ['primero', 'segundo', 'tortilla', 'huevo',  ], price: 6},
    {name: 'ensalada de mollejas de pato' , tags: ['primero', 'ensalada', 'frio', 'gluten free'], price: 8},
    {name: 'sopa de pescado' , tags: ['primero', 'caliente', 'sopa', 'pescado' ], price: 12},
    {name: 'crepe de setas ', tags: ['primero', 'segundo', 'caliente', 'setas'], price: 9},
    {name: 'ensalada de lentejas', tags: ['primero', 'ensalada', 'frio', 'veggie', 'gluten free' ], price: 8},
    {name: 'solomillo de ternera' , tags: ['segudo', 'carne', 'ternera', 'caliente' ], price:15},
    {name: 'bacalao gratinado' , tags: ['segundo', 'caliente', 'pescado', 'bacalao', 'gratinado' ], price: 14},
    {name: 'sopa de cebolla' , tags: ['primero',  'caliente', 'gratinado' ], price: 9},
    {name: 'lenguado a la meniere', tags: ['segundo', 'pescado'], price: 17},
    {name: 'osobuco' , tags: ['segundo', 'caliente', 'ternera' ], price:10},
    {name: 'verengena rellena', tags: ['segundo', 'caliente', 'veggie', 'berengena' ], price:10},
    {name: 'graellada de verduras' , tags: ['segundo', 'primero', 'verduras', 'veggie'  ], price: 9},
    {name: 'sorbete de mandarina', tags: ['postre', 'frio', 'sorbete', 'mandarina' ], price: 4},
    {name: 'tarta tatin', tags: ['postre', 'tarta', 'manzana' ], price: 4},
    {name: 'brownie', tags: ['postre', 'bizcocho', 'chocolate' ], price: 4}
]


for(let i = 0 ; i < plats.length; i++ ){
    Dish.$push(plats[i])
}




