require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(

     //ITX strike 29
    {
        product: ObjectId('5eece03339ffd529ba303ea6'),
        date: new Date('June 10, 2020'),
        price: 0.19
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea6'),
        date: new Date('June 11, 2020'),
        price: 0.18
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea6'),
        date: new Date('June 05, 2020'),
        price: 0.20
    },

    //ITX strike 27

    {
        product: ObjectId('5eece03339ffd529ba303ea4'),
        date: new Date('June 08, 2020'),
        price: 0.70
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea4'),
        date: new Date('June 10, 2020'),
        price: 0.72
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea4'),
        date: new Date('June 11, 2020'),
        price: 0.68
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea4'),
        date: new Date('June 05, 2020'),
        price: 0.71
    },

    // IBE future

    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 19, 2020'),
        price: 9.80
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 18, 2020'),
        price: 9.81
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 17, 2020'),
        price: 9.50
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 16, 2020'),
        price: 9.74
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 15, 2020'),
        price: 9.60
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 12, 2020'),
        price: 9.49
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 10, 2020'),
        price: 9.80
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 11, 2020'),
        price: 9.90
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea3'),
        date: new Date('June 05, 2020'),
        price: 9.95
    },

    // BBVA future
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 17, 2020'),
        price: 3.58
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 18, 2020'),
        price: 3.54
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 19, 2020'),
        price: 3.51
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 16, 2020'),
        price: 3.58
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 15, 2020'),
        price: 3.54
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 12, 2020'),
        price: 3.51
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 11, 2020'),
        price: 3.50
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 09, 2020'),
        price: 3.58
    },

    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 08, 2020'),
        price: 3.58
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 10, 2020'),
        price: 3.54
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 05, 2020'),
        price: 3.51
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea2'),
        date: new Date('June 04, 2020'),
        price: 3.50
    },

    //BBVA udnerlying

    {   
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 01, 2020'),        
        price: 3.18
    },
    {   
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 04, 2020'),        
        price: 3.05
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 05, 2020'),        
        price: 3.02
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 06, 2020'),        
        price: 2.95
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 07, 2020'),        
        price: 2.87
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 08, 2020'),        
        price: 2.93
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 11, 2020'),
        price: 2.86
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 12, 2020'),
        price: 2.89
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 13, 2020'),
        price: 2.80
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 14, 2020'),
        price: 2.70
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 15, 2020'),
        price: 2.81
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 18, 2020'),
        price: 2.90
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 19, 2020'),
        price: 2.82
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 20, 2020'),
        price: 2.76
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 21, 2020'),
        price: 2.82
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 22, 2020'),
        price: 2.86
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 26, 2020'),
        price: 3.00
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 27, 2020'),
        price: 3.23
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 28, 2020'),
        price: 3.27
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('May 29, 2020'),
        price: 3.13
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 01, 2020'),
        price: 3.10
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 02, 2020'),
        price: 3.34
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 03, 2020'),
        price: 3.47
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 04, 2020'),
        price: 3.59
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 05, 2020'),
        price: 3.92
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 08, 2020'),
        price: 3.34
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 09, 2020'),
        price: 3.47
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 10, 2020'),
        price: 3.59
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea8'),
        date: new Date('June 11, 2020'),
        price: 3.92
    },

    // IBE underlying

    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 04, 2020'),
        price: 8.90
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 05, 2020'),
        price: 8.97
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 06, 2020'),
        price: 8.88
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 07, 2020'),
        price: 8.96
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 08, 2020'),
        price: 8.85
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 11, 2020'),
        price: 8.81
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 12, 2020'),
        price: 8.68
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 13, 2020'),
        price: 8.60
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 14, 2020'),
        price: 8.55
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 15, 2020'),
        price: 8.61
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 19, 2020'),
        price: 9.06
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 20, 2020'),
        price: 8.90
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 21, 2020'),
        price: 8.92
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 22, 2020'),
        price: 8.82
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 25, 2020'),
        price: 9.07
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 26, 2020'),
        price: 9.30
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 27, 2020'),
        price: 9.22
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 28, 2020'),
        price: 9.59
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('May 29, 2020'),
        price: 9.61
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 01, 2020'),
        price: 9.75
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 02, 2020'),
        price: 9.77
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 03, 2020'),
        price: 9.98
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 04, 2020'),
        price: 10.02
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 05, 2020'),
        price: 9.75
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 08, 2020'),
        price: 9.77
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 09, 2020'),
        price: 9.98
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 10, 2020'),
        price: 10.02
    },
    {
        product: ObjectId('5eece03339ffd529ba303ea9'),
        date: new Date('June 11, 2020'),
        price: 10.01
    },


    // ITX underlying


    {   
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 04, 2020'),
        price: 24.50
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 05, 2020'),
        price: 25.61
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 06, 2020'),
        price: 24.59
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 07, 2020'),
        price: 24.37
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 08, 2020'),
        price: 23.63
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 11, 2020'),
        price: 24.59
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 12, 2020'),
        price: 24.37
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 13, 2020'),
        price: 23.33
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 14, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 15, 2020'),
        price: 24.17
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 18, 2020'),
        price: 24.05
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 19, 2020'),
        price: 24.71
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 20, 2020'),
        price: 24.52
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 21, 2020'),
        price: 24.74
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 22, 2020'),
        price: 25.56
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 25, 2020'),
        price: 24.84
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 26, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 27, 2020'),
        price: 24.60
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 28, 2020'),
        price: 24.90
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('May 29, 2020'),
        price: 24.58
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 02, 2020'),
        price: 24.70
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 03, 2020'),
        price: 24.15
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 04, 2020'),
        price: 24.08
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 05, 2020'),
        price: 24.50
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 08, 2020'),
        price: 24.84
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 09, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 10, 2020'),
        price: 24.60
    },
    {
        product: ObjectId('5eece03339ffd529ba303eaa'),
        date: new Date('June 11, 2020'),
        price: 24.90
    }

)

.then(mongoose.disconnect)

