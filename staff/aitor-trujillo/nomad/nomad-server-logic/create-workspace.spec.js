require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createWorkspace = require('./create-workspace')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')

describe('logic - create workspace', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandom = {}
    let userName, surname, email, password, userId

    beforeEach(async () => {

        await Workspace.deleteMany()

        workspaceRandom = {
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
    })

    it('should succeed on valid data', async () => {
        const result = await createWorkspace(userId, workspaceRandom)

        expect(result).to.be.undefined

        const workspaces = await Workspace.find().lean()

        expect(workspaces.length).to.equal(1)

        const [workspace] = workspaces

        expect(workspace).to.exist

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

    describe('when workspace already exists', () => {
        beforeEach(async () => {
            workspaceRandom.creator = userId
            return await Workspace.create(workspaceRandom)
        })

        // ASYNC UNHAPPY PATHS

        it('should fail on trying to create an existing workspace with same phone', async () => {
            try {
                await createWorkspace(userId, workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`workspace with phone ${workspaceRandom.phone} already exists`)
            }
        })

        // SYNC UNHAPPY PATHS

        it('should fail on trying to add number userId', async () => {
            try {
                await createWorkspace(1, workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('1 is not a string')
            }
        })
        it('should fail on trying to add boolean userId', async () => {
            try {
                await createWorkspace(true, workspaceRandom)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('true is not a string')
            }
        })
        it('should fail on trying to add null userId', async () => {
            try {
                await createWorkspace(null, workspaceRandom)

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