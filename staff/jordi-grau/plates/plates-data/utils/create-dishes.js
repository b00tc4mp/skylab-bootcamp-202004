const {Dish} = require('../models')
const mongoose = require('../mongoose')


async function createDishes(){
    const connection = await mongoose.connect('mongodb://localhost:27017/plates')
    
    const dishes = [
        {name:'Arroz con conejo' , price: 12, tags:['entrante', 'primer plato', "arroz", "conejo"]},
        {name:'Ensalada de lentejas' , price: 10, tags:['entrante', 'primer plato','ensalada', 'legumbres', 'veggie', 'vegetariano', 'gluten free']},
        {name:'Tortilla de patatas' , price: 14, tags:['tortilla', 'huevo']},
        {name:'Sopa de cebolla' , price: 12, tags:['entrante', 'primer plato','sopa', 'caliente','gratinado']},
        {name:'Gazpacho' , price: 8, tags:['entrante', 'primer plato', 'frio','sopa']},
        {name:'Lenguado Meniere' , price: 26, tags:['segundo plato', 'principal', 'pescado']},
        {name:'Solomillo de ternera' , price: 18, tags:['segundo plato', 'principal', 'carne', 'ternera']},
        {name:'Salmon a las finas hierbas' , price: 14, tags:['segundo plato', 'principal', 'pescado']},
        {name:'Arroz caldoso con bogavante' , price: 18, tags:['primer plato', 'entrante', 'segundo plato', 'principal', 'marisco', 'economico', 'low cost']},
        {name:'Matahambre' , price: 8, tags:['entrante', 'primer plato', 'carne', 'ternera', 'argentino']},
        {name:'Choripan' , price: 10, tags:['primer plato', 'entrante', 'argentino', 'brasa']},
        {name:'Entrecot a la brasa' , price: 18, tags:['ternera', 'brasa', 'carne']},
        {name:'Coulant con helado de vainilla' , price: 9, tags:['helado', 'chocolate', 'postre']},
        {name:'Sorbete de mandarina' , price: 10, tags:['frio', 'mandarina', 'sorbete', 'postre']},
        {name:'Bolas de piña con cava' , price: 16, tags:['postre', 'piña', 'cava']}


    ]

    for(let i=0; i< dishes.length; i++){
        await Dish.create(dishes[i])
    }
}

createDishes()