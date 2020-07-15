require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const retrieveWorkspaces = require('./retrieve-workspaces')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/ponyfills/atob')
const { mongoose, models: { User, Workspace } } = require('nomad-data')
const { errors: { UnexistenceError } } = require('nomad-commons')
global.fetch = require('node-fetch')
const bcrypt = require('bcryptjs')
const jwtPromised = require('../nomad-api/helpers/jwt-promised')
const context = require('./context')
context.API_URL = API_URL

const AsyncStorage = require('not-async-storage')
context.storage = AsyncStorage


describe('client - retrieve workspaces', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, token, encryptedPassword, userId
    let workspace1 = {}
    let workspace2 = {}
    let workspaceId1
    let workspaceId2
    let ws1, ws2

    const generateWorkspace = (id, filter) => {
        return {
            creator: id,
            name: `name-${random()}`,
            category: filter,
            price: { amount: random() + 100, term: 'month' },
            address: { street: `${random()} st`, city: `${random()} city`, country: `${random()} country` },
            geoLocation: { coordinates: [random() * 15 + 1, random() * 15 + 1] },
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
            .then(async () => {
                name = `name-${random()}`;
                surname = `surname-${random()}`;
                email = `email-${random()}@gmail.com`;
                password = `password-${random()}`;
                encryptedPassword = await bcrypt.hash(password, 10);
            })


        await User.create({ name, surname, email, password })
            .then(({ id }) => {
                userId = id
            })

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token', token)

        workspace1 = generateWorkspace(userId, 'cowork')
        workspace2 = generateWorkspace(userId, 'coffee')

        ws1 = await Workspace.create(workspace1)
        ws2 = await Workspace.create(workspace2)

        workspaceId1 = ws1.id
        workspaceId2 = ws2.id
        return

    })

    it('should get the results by location', async () => {
        let location = { latitude: random() * 15 + 1, longitude: random() * 15 + 1 }

        const results = await retrieveWorkspaces(location)

        expect(results).to.exist

        let _ws1 = ws1
        let _ws2 = ws2

        const [workspace1, workspace2] = results
        if (ws1.name !== workspace1.name) {
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
        expect(workspace1.geoLocation.coordinates[1]).to.equal(_ws1.geoLocation.coordinates[1])
        expect(workspace2.geoLocation.coordinates[1]).to.equal(_ws2.geoLocation.coordinates[1])
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

    it('should get the results by location & filter', async () => {
        let location = { latitude: random() * 15 + 1, longitude: random() * 15 + 1 }

        const results = await retrieveWorkspaces(location, 'cowork')

        expect(results).to.exist

        expect(results.length).to.equal(1)

        const [workspace] = results

        expect(workspace.name).to.equal(ws1.name)
        expect(workspace.price.amount).to.equal(ws1.price.amount)
        expect(workspace.price.term).to.equal(ws1.price.term)
        expect(workspace.address.street).to.equal(ws1.address.street)
        expect(workspace.address.city).to.equal(ws1.address.city)
        expect(workspace.address.country).to.equal(ws1.address.country)
        expect(workspace.geoLocation.coordinates[0]).to.equal(ws1.geoLocation.coordinates[0])
        expect(workspace.geoLocation.coordinates[1]).to.equal(ws1.geoLocation.coordinates[1])
        expect(workspace.features.wifi).to.equal(ws1.features.wifi)
        expect(workspace.features.parking).to.equal(ws1.features.parking)
        expect(workspace.features.coffee).to.equal(ws1.features.coffee)
        expect(workspace.features.meetingRooms).to.equal(ws1.features.meetingRooms)
        expect(workspace.description).to.equal(ws1.description)
        expect(workspace.capacity).to.equal(ws1.capacity)
    })
    describe('when user does not exist', () => {
        beforeEach(async () =>
            await User.deleteMany()
        )

        it('should fail on unexisting userid', async () => {
            let location = { latitude: random() * 15 + 1, longitude: random() * 15 + 1 }
            const results = await retrieveWorkspaces(location)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
    })
    describe('when there is no workspaces near', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to retrieve', async () => {
            let location = { latitude: random() * 15 + 1, longitude: random() * 15 + 1 }
            const results = await retrieveWorkspaces(location)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('No workspaces near you')
                })
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})