require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const deleteWorkspace = require('./delete-workspace-by-id')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')

describe('logic - retrieve workspace by id', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandom = {}
    let userName, surname, email, password, userId
    let _userId
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
            photos: [`photo-${random()}`],
            phone: `phone-${random()}`,
            features: { wifi: false, parking: false, coffee: true, meetingRooms: true },
            description: `description-${random()}`,
            capacity: random(),
        }

        await Workspace.create(workspaceRandom)
            .then(({ id }) => { workspaceId = id })
    })
    it('should succeed on valid workspaceId', async () => {
        await deleteWorkspace(userId, workspaceId)

        const workspace = await Workspace.findOne({ _id: workspaceId })

        expect(workspace).to.be.null
    })

    describe('when workspace does not exist', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to retrieve', async () => {

            const results = await deleteWorkspace(userId, workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workspace with id ${workspaceId} does not exist`)
                })
        })
    })

    describe('when user is not the admin', () => {
        beforeEach(async () => {
            const name = `name-${random()}`
            const email = `e-${random()}@mail.com`
            await User.create({ name, surname, email, password })
                .then(({ id }) => {
                    _userId = id
                })
        })

        it('should fail if user does not match with creator', async () => {

            const results = await deleteWorkspace(_userId, workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('Workspace Admin needed to remove.')
                })
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})