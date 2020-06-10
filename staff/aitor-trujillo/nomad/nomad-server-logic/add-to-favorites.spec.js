require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const addToFavorites = require('./add-to-favorites')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')

describe('logic - place review in workspace', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandom = {}
    let userName, surname, email, password, userId
    let workspaceId

    beforeEach(async () => {

        await Workspace.deleteMany()
        await User.deleteMany()
            .then(() => {
                userName = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })


        await User.create({ name: userName, surname, email, password })
            .then(({ id }) => {
                userId = id
            })

        workspaceRandom = {
            creator: userId,
            name: `name-${random()}`,
            category: 'cowork',
            price: { amount: random() + 100, term: 'month' },
            address: { street: `${random()} st`, city: `${random()} city`, country: `${random()} country` },
            geoLocation: { coordinates: [random(), random()] },
            // timetable = `timetable-${random()}`
            photos: [`photo-${random()}`],
            phone: `phone-${random()}`,
            features: { wifi: '100mb', parking: `km-${random()}`, coffee: true, meetingRooms: random() },
            description: `description-${random()}`,
            capacity: random(),
        }

        await Workspace.create(workspaceRandom)
            .then(({ id }) => { workspaceId = id })
    })

    it('should succeed on valid workspaceId', async () => {
        const result = await addToFavorites(userId, workspaceId)

        expect(result).to.be.undefined

        const workspace = await User.findOne({ _id: userId })
        const { favorites } = workspace
        const [favorite] = favorites

        expect(favorite.toString()).to.equal(workspaceId)
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})