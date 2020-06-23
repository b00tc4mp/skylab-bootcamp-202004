require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const deleteWorkspace = require('./delete-workspace')
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


        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token', token)
    })

    it('should succeed on valid workspaceId', async () => {
        await deleteWorkspace(workspaceId)

        const workspace = await Workspace.findOne({ _id: workspaceId })

        expect(workspace).to.be.null
    })

    describe('when workspace does not exist', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to retrieve', async () => {

            const results = await deleteWorkspace(workspaceId)
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

            await context.storage.removeItem('token')
            token = await jwtPromised.sign({ sub: _userId }, SECRET)
            await context.storage.setItem('token', token)
        })

        it('should fail if user does not match with creator', async () => {

            const results = await deleteWorkspace(workspaceId)
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