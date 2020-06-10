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
            features: { wifi: '100mb', parking: `km-${random()}`, coffee: true, meetingRooms: random() },
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
        debugger


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

        const [workspace] = results

        expect(workspace.name).to.equal(workspaceRandom.name)
        expect(workspace.price.amount).to.equal(workspaceRandom.price.amount)
        expect(workspace.price.term).to.equal(workspaceRandom.price.term)
        expect(workspace.address.street).to.equal(workspaceRandom.address.street)
        expect(workspace.address.city).to.equal(workspaceRandom.address.city)
        expect(workspace.address.country).to.equal(workspaceRandom.address.country)
        expect(workspace.geoLocation.coordinates[0]).to.equal(workspaceRandom.geoLocation.coordinates[0])
        expect(workspace.photos[0]).to.equal(workspaceRandom.photos[0])
        expect(workspace.features.wifi).to.equal(workspaceRandom.features.wifi)
        expect(workspace.features.parking).to.equal(workspaceRandom.features.parking)
        expect(workspace.features.coffee).to.equal(workspaceRandom.features.coffee)
        expect(workspace.features.meetingRooms).to.equal(workspaceRandom.features.meetingRooms)
        expect(workspace.description).to.equal(workspaceRandom.description)
        expect(workspace.capacity).to.equal(workspaceRandom.capacity)
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})