require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Product } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect(MONGODB_URL)

const date = new Date('June 19, 2020')

Product.findByIdAndUpdate(ObjectId('5ee3d2b78de56b8153b7d830'), {settlementDate: date})

.then(mongoose.disconnect)

