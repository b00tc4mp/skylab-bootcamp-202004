require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const createWorkspace = require('./create-workspace')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/ponyfills/atob')
const { mongoose, models: { User, Workspace } } = require('nomad-data')
const { errors: { VoidError } } = require('nomad-commons')
global.fetch = require('node-fetch')
const jwtPromised = require('../nomad-api/helpers/jwt-promised')
const bcrypt = require('bcryptjs')
const context = require('./context')
context.API_URL = API_URL

const AsyncStorage = require('not-async-storage')
context.storage = AsyncStorage

describe('client - create workspace', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandom = {}
    let name, surname, email, password, userId, encryptedPassword, token

    beforeEach(async () => {

        await Workspace.deleteMany()

        workspaceRandom = {
            name: `name-${random()}`,
            category: { value: "coffee", },
            price: random() + 100,
            term: { value: 'month' },
            coffee: true,
            meetingRooms: false,
            parking: true,
            wifi: true,
            country: `${random()} country`,
            street: `${random()} st`,
            city: `${random()} city`,
            location: { latitude: random() * 15, longitude: random() * 15 },
            phone: `phone-${random()}`,
            description: `description-${random()}`,
            capacity: random().toString(),
        }


        await User.deleteMany()
            .then(async () => {
                name = `name-${random()}`;
                surname = `surname-${random()}`;
                email = `email-${random()}@gmail.com`;
                password = `password-${random()}`;
                encryptedPassword = await bcrypt.hash(password, 10);
            })


        await User.create({ name, surname, email, password: encryptedPassword })
            .then(({ id }) => {
                userId = id
            })

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token', token)
    })

    it('should succeed on valid data', async () => {
        const result = await createWorkspace(workspaceRandom)

        const workspaces = await Workspace.find().lean()

        expect(workspaces.length).to.equal(1)

        const [workspace] = workspaces

        expect(workspace).to.exist

        expect(workspace.name).to.equal(workspaceRandom.name)
        expect(workspace.price.amount).to.equal(workspaceRandom.price)
        expect(workspace.price.term).to.equal(workspaceRandom.term.value)
        expect(workspace.address.street).to.equal(workspaceRandom.street)
        expect(workspace.address.city).to.equal(workspaceRandom.city)
        expect(workspace.address.country).to.equal(workspaceRandom.country)
        expect(workspace.geoLocation.coordinates[0]).to.equal(workspaceRandom.location.longitude)
        expect(workspace.features.wifi).to.equal(true)
        expect(workspace.features.parking).to.equal(true)
        expect(workspace.features.coffee).to.equal(true)
        expect(workspace.features.meetingRooms).to.equal(false)
        expect(workspace.description).to.equal(workspaceRandom.description)
        expect(workspace.capacity).to.equal(Number(workspaceRandom.capacity))
    })

    describe('when workspace already exists', () => {
        beforeEach(async () => {
            const workspaceSchemized = {
                geoLocation: {
                    coordinates: [workspaceRandom.location.longitude, workspaceRandom.location.latitude]
                },
                name: workspaceRandom.name,
                category: workspaceRandom.category.value,
                price: {
                    amount: Number(workspaceRandom.price),
                    term: workspaceRandom.term.value
                },
                phone: workspaceRandom.phone,
                address: {
                    street: workspaceRandom.street,
                    city: workspaceRandom.city,
                    country: workspaceRandom.country
                },
                description: workspaceRandom.description,
                capacity: Number(workspaceRandom.capacity),
                features: {
                    wifi: workspaceRandom.wifi,
                    parking: workspaceRandom.parking,
                    coffee: workspaceRandom.coffee,
                    meetingRooms: workspaceRandom.meetingRooms
                }
            }
            workspaceSchemized.creator = userId
            return await Workspace.create(workspaceSchemized)
        })

        // ASYNC UNHAPPY PATHS

        it('should fail on trying to create an existing workspace with same phone', async () => {
            try {
                await createWorkspace(workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`workspace with phone ${workspaceRandom.phone} already exists`)
            }
        })

        it('should fail on trying to add number name', async () => {
            try {
                workspaceRandom.name = 1
                await createWorkspace(workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('1 is not a string')
            }
        })
        it('should fail on trying to add boolean name', async () => {
            try {
                workspaceRandom.name = true
                await createWorkspace(workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('true is not a string')
            }
        })
        it('should fail on trying to add null name', async () => {
            try {
                workspaceRandom.name = null
                await createWorkspace(workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('null is not a string')
            }
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})