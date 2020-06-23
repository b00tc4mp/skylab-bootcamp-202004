require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const retrieveWorkspaceById = require('./retrieve-workspace-by-id')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/ponyfills/atob')
const { mongoose, models: { User, Workspace } } = require('nomad-data')
const { errors: { VoidError } } = require('nomad-commons')
global.fetch = require('node-fetch')
const bcrypt = require('bcryptjs')
const jwtPromised = require('../nomad-api/helpers/jwt-promised')
const context = require('./context')
context.API_URL = API_URL

const AsyncStorage = require('not-async-storage')
context.storage = AsyncStorage


describe('logic - retrieve workspace by id', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandom = {}
    let name, surname, email, password, token, encryptedPassword, userId
    let workspaceId

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

        workspaceRandom = {
            creator: userId,
            name: `name-${random()}`,
            category: 'cowork',
            price: { amount: random() + 100, term: 'month' },
            address: { street: `${random()} st`, city: `${random()} city`, country: `${random()} country` },
            geoLocation: { coordinates: [random(), random()] },
            phone: `phone-${random()}`,
            features: { wifi: false, parking: false, coffee: true, meetingRooms: true },
            description: `description-${random()}`,
            capacity: random(),
        }

        await Workspace.create(workspaceRandom)
            .then(({ id }) => { workspaceId = id })
    })

    it('should succeed on valid workspaceId', async () => {
        const workspace = await retrieveWorkspaceById(workspaceId)

        expect(workspace).to.exist

        expect(workspace.name).to.equal(workspaceRandom.name)
        expect(workspace.price.amount).to.equal(workspaceRandom.price.amount)
        expect(workspace.price.term).to.equal(workspaceRandom.price.term)
        expect(workspace.address.street).to.equal(workspaceRandom.address.street)
        expect(workspace.address.city).to.equal(workspaceRandom.address.city)
        expect(workspace.address.country).to.equal(workspaceRandom.address.country)
        expect(workspace.geoLocation.coordinates[0]).to.equal(workspaceRandom.geoLocation.coordinates[0])
        expect(workspace.features.wifi).to.equal(workspaceRandom.features.wifi)
        expect(workspace.features.parking).to.equal(workspaceRandom.features.parking)
        expect(workspace.features.coffee).to.equal(workspaceRandom.features.coffee)
        expect(workspace.features.meetingRooms).to.equal(workspaceRandom.features.meetingRooms)
        expect(workspace.description).to.equal(workspaceRandom.description)
        expect(workspace.capacity).to.equal(workspaceRandom.capacity)
    })

    describe('when workspace does not exist', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to retrieve', async () => {

            const results = await retrieveWorkspaceById(workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workspace with id ${workspaceId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})