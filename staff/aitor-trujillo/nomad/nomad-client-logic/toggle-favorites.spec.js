require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, SECRET } } = process

const toggleFavorites = require('./toggle-favorites')
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


describe('client - toggle favorites', () => {
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


        await User.create({ name, surname, email, password: encryptedPassword })
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

        const workspace = await Workspace.create(workspaceRandom)

        workspaceId = workspace.id
    })
    it('should succeed on valid workspaceId', async () => {
        const result = await toggleFavorites(workspaceId)

        expect(result).to.be.undefined

        const workspace = await User.findOne({ _id: userId })

        const { favorites } = workspace
        const [favorite] = favorites

        expect(favorite.toString()).to.equal(workspaceId)
    })

    it('should delete already added favorite', async () => {
        const user = await User.findById(userId)
        user.favorites.push(workspaceId)
        await user.save()


        const result = await toggleFavorites(workspaceId)

        expect(result).to.be.undefined

        const workspace = await User.findOne({ _id: userId })
        const { favorites } = workspace
        expect(favorites.length).to.equal(0)

    })

    describe('when user does not exist', () => {
        beforeEach(async () =>
            await User.deleteMany()
        )

        it('should fail on unexisting userid', async () => {

            const results = await toggleFavorites(workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
    })
    describe('when workspace does not exist', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to toggle fav', async () => {

            const results = await toggleFavorites(workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    console.log(error.message)
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workspace with id ${workspaceId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})