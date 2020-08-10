require('dotenv').config();
const {env: { MONGODB_URL }} = process;
const {mongoose, models: { Dish }} = require('plates-data')
const mongo = require('plates-data/mongo')


let plats = [
    {name: 'Tortilla de patata' , position: 'primero', tags: ['tortilla', 'huevo',  ], price: 6},
    {name: 'Ensalada de mollejas de pato' , possition: 'primero', tags: [ 'ensalada', 'frio', 'gluten free'], price: 8},
    {name: 'Sopa de pescado' , position: 'primero', tags: ['caliente', 'sopa', 'pescado' ], price: 12},
    {name: 'Ensalada de lentejas', position: 'primero', tags: ['ensalada', 'frio', 'veggie', 'gluten free' ], price: 8},
    {name: 'Sopa de cebolla' ,position: 'primero', tags: ['caliente', 'gratinado' ], price: 9},
    {name: 'Parrillada de verduras' ,position: 'primero', tags: ['verduras', 'veggie'  ], price: 9},
    {name: 'Crepe de setas ',position: 'segundo', tags: ['caliente', 'setas'], price: 9},
    {name: 'Solomillo de ternera' ,position: 'segundo', tags: ['carne', 'ternera', 'caliente' ], price:15},
    {name: 'Bacalao gratinado' ,position: 'segundo', tags: ['caliente', 'pescado', 'bacalao', 'gratinado' ], price: 14},
    {name: 'Lenguado a la meniere', position: 'segundo', tags: ['pescado'], price: 17},
    {name: 'Osobuco' , position: 'segundo', tags: ['caliente', 'ternera' ], price:10},
    {name: 'Berengena rellena', position: 'segundo', tags: ['caliente', 'veggie', 'berengena' ], price:10},
    {name: 'Sorbete de mandarina', position: 'postre', tags: ['frio', 'sorbete', 'mandarina' ], price: 4},
    {name: 'Tarta tatin', position: 'postre', tags: ['tarta', 'manzana' ], price: 4},
    {name: 'Brownie', position: 'postre', tags: ['bizcocho', 'chocolate' ], price: 4}
]

mongoose.connect(MONGODB_URL, {useUnifiedTopology: true})
.then(async () => {
    await Promise.all(plats.map(plat => Dish.create(plat)))

})
.then(() => mongoose.disconnect())



