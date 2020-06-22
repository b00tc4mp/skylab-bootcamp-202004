require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveByLocation = require('./retrieve-by-location')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')

describe('logic - retrieve ws by location', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspace1 = {}
    let workspace2 = {}
    let userName, surname, email, password, userId
    let workspaceId1
    let workspaceId2
    let ws1, ws2

    const generateWorkspace = (id) => {
        return {
            creator: id,
            name: `name-${random()}`,
            category: 'cowork',
            price: { amount: random() + 100, term: 'month' },
            address: { street: `${random()} st`, city: `${random()} city`, country: `${random()} country` },
            geoLocation: { coordinates: [random() * 15 + 1, random() * 15 + 1] },
            // timetable = `timetable-${random()}`
            photos: [`photo-${random()}`],
            phone: `phone-${random()}`,
            features: { wifi: false, parking: false, coffee: true, meetingRooms: false },
            description: `description-${random()}`,
            capacity: random(),
        }
    }


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

        workspace1 = generateWorkspace(userId)
        workspace2 = generateWorkspace(userId)

        ws1 = await Workspace.create(workspace1)
        ws2 = await Workspace.create(workspace2)

        workspaceId1 = ws1.id
        workspaceId2 = ws2.id
        return


    })

    it('should get the results by location', async () => {
        let location = [random() * 15 + 1, random() * 15 + 1]

        const results = await retrieveByLocation(userId, location)

        expect(results).to.exist

        let _ws1, _ws2

        const [workspace1, workspace2] = results
        if (ws1.name === workspace1.name) {
            _ws1 = ws1
            _ws2 = ws2
        } else {
            _ws1 = ws2
            _ws2 = ws1
        }

        expect(workspace1.name).to.equal(_ws1.name)
        expect(workspace2.name).to.equal(_ws2.name)
        expect(workspace1.price.amount).to.equal(_ws1.price.amount)
        expect(workspace2.price.amount).to.equal(_ws2.price.amount)
        expect(workspace1.price.term).to.equal(_ws1.price.term)
        expect(workspace2.price.term).to.equal(_ws2.price.term)
        expect(workspace1.address.street).to.equal(_ws1.address.street)
        expect(workspace2.address.street).to.equal(_ws2.address.street)
        expect(workspace1.address.city).to.equal(_ws1.address.city)
        expect(workspace2.address.city).to.equal(_ws2.address.city)
        expect(workspace1.address.country).to.equal(_ws1.address.country)
        expect(workspace2.address.country).to.equal(_ws2.address.country)
        expect(workspace1.geoLocation.coordinates[0]).to.equal(_ws1.geoLocation.coordinates[0])
        expect(workspace2.geoLocation.coordinates[0]).to.equal(_ws2.geoLocation.coordinates[0])
        expect(workspace1.features.wifi).to.equal(_ws1.features.wifi)
        expect(workspace2.features.wifi).to.equal(_ws2.features.wifi)
        expect(workspace1.features.parking).to.equal(_ws1.features.parking)
        expect(workspace2.features.parking).to.equal(_ws2.features.parking)
        expect(workspace1.features.coffee).to.equal(_ws1.features.coffee)
        expect(workspace2.features.coffee).to.equal(_ws2.features.coffee)
        expect(workspace1.features.meetingRooms).to.equal(_ws1.features.meetingRooms)
        expect(workspace2.features.meetingRooms).to.equal(_ws2.features.meetingRooms)
        expect(workspace1.description).to.equal(_ws1.description)
        expect(workspace2.description).to.equal(_ws2.description)
        expect(workspace1.capacity).to.equal(_ws1.capacity)
        expect(workspace2.capacity).to.equal(_ws2.capacity)
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})