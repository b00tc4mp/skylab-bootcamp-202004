require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

const {random} = Math

const randomPrice = (min, max) => (random() * (max - min + 1) + min).toFixed(2) * 1

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(

    //BBVA 12

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 01, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 02, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 03, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 04, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 05, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 08, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 09, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 10, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 11, 2020'),
        price: randomPrice(3, 4)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 12, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 15, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 16, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 17, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 18, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d2'),
        date: new Date('June 19, 2020'),
        price: randomPrice(3, 4)
    },

    //Ibe Jun

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 01, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 02, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 03, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 04, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 05, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 08, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 09, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 10, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 11, 2020 UTC'),
        price: randomPrice(7, 9)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 12, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 15, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 16, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 17, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 18, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 19, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 20, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 21, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 22, 2020 UTC'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d3'),
        date: new Date('June 23, 2020 UTC'),
        price: randomPrice(8, 11)
    },

    //BBVA sep

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 01, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 02, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 03, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 04, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 05, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 08, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 09, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 10, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 11, 2020'),
        price: randomPrice(3, 4)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 12, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 15, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 16, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 17, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 18, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d4'),
        date: new Date('June 19, 2020'),
        price: randomPrice(3, 4)
    },

    // IBE future sep

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 01, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 02, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 03, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 04, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 05, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 08, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 09, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 10, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 11, 2020'),
        price: randomPrice(2,3)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 12, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 15, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 16, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 17, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 18, 2020'),
        price: randomPrice(2,3)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d5'),
        date: new Date('June 19, 2020'),
        price: randomPrice(2,3)
    },

    // AENA sep
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 01, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 02, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 03, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 04, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 05, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 08, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 09, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 10, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 11, 2020'),
        price: randomPrice(128, 124)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 12, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 15, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 16, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 17, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 18, 2020'),
        price: randomPrice(128, 124)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d6'),
        date: new Date('June 19, 2020'),
        price: randomPrice(128, 124)
    },

    //ITX dicie

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 01, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 02, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 03, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 04, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 05, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 08, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 09, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 10, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 11, 2020'),
        price: randomPrice(25, 27)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 12, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 15, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 16, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 17, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 18, 2020'),
        price: randomPrice(25, 27)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d7'),
        date: new Date('June 19, 2020'),
        price: randomPrice(25, 27)
    },

    //ADSG dic

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 01, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 02, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 03, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 04, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 05, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 08, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 09, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 10, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 11, 2020'),
        price: randomPrice(240, 244)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 12, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 15, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 16, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 17, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 18, 2020'),
        price: randomPrice(240, 244)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d8'),
        date: new Date('June 19, 2020'),
        price: randomPrice(240, 244)
    },

    // DBKI sept

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 01, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 02, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 03, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 04, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 05, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 08, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 09, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 10, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 11, 2020'),
        price: randomPrice(7, 9)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 12, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 15, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 16, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 17, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 18, 2020'),
        price: randomPrice(7, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6d9'),
        date: new Date('June 19, 2020'),
        price: randomPrice(7, 9)
    },

    //ITX call 27


    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 01, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 02, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 03, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 04, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 05, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 08, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 09, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 10, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 11, 2020'),
        price: randomPrice(0.5, 0.8)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 12, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 15, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 16, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 17, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 18, 2020'),
        price: randomPrice(0.5, 0.8)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6da'),
        date: new Date('June 19, 2020'),
        price: randomPrice(0.5, 0.8)
    },

    //ITX call 29

    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 01, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 02, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 03, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 04, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 05, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 08, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 09, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 10, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 11, 2020'),
        price: randomPrice(0.4, 0.5)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 12, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 15, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 16, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 17, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 18, 2020'),
        price: randomPrice(0.4, 0.5)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6dc'),
        date: new Date('June 19, 2020'),
        price: randomPrice(0.4, 0.5)
    },

    //HNK put 98

    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 01, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 02, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 03, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 04, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 05, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 08, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 09, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 10, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 11, 2020'),
        price: randomPrice(10, 11)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 12, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 15, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 16, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 17, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 18, 2020'),
        price: randomPrice(10, 11)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6de'),
        date: new Date('June 19, 2020'),
        price: randomPrice(10, 11)
    },

    //put HNK 95

    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 01, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 02, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 03, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 04, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 05, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 08, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 09, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 10, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 11, 2020'),
        price: randomPrice(8, 9)
    },

    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 12, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 15, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 16, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 17, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 18, 2020'),
        price: randomPrice(8, 9)
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e0'),
        date: new Date('June 19, 2020'),
        price: randomPrice(8, 9)
    },

)

    .then(mongoose.disconnect)

