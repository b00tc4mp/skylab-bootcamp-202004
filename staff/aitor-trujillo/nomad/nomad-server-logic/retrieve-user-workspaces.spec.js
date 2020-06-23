require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUserWorkspaces = require('./retrieve-user-workspaces')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')
const { UnexistenceError } = require('nomad-commons/errors')

describe('logic - retrieve workspace by id', () => {
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
            phone: `phone-${random()}`,
            features: { wifi: false, parking: false, coffee: true, meetingRooms: true },
            description: `description-${random()}`,
            capacity: random(),
        }

        await Workspace.create(workspaceRandom)
            .then(({ id }) => { workspaceId = id })

        const user = await User.findById(userId)
        user.userWorkspaces.push(workspaceId)
        await user.save()
    })

    it('should succeed on valid workspaceId', async () => {
        const userWorkspace = await retrieveUserWorkspaces(userId)

        expect(userWorkspace).to.exist

        const [workspace] = userWorkspace

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

    describe('when user has no workspaces', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to retrieve', async () => {

            const results = await retrieveUserWorkspaces(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal("You don't have any workspaces :(")
                })
        })
    })
    describe('when user does not exist', () => {
        beforeEach(async () =>
            await User.deleteMany()
        )

        it('should fail on wrong userId', async () => {

            const results = await retrieveUserWorkspaces(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    console.log(error)
                    expect(error).to.be.an.instanceof(UnexistenceError)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})