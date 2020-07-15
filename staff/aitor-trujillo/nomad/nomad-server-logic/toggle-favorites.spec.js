require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const toggleFavorites = require('./toggle-favorites')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')
const { errors: { UnexistenceError } } = require('nomad-commons')

describe('logic - toggle favorites', () => {
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
            // timetable = `timetable-${random()}`
            photos: [`photo-${random()}`],
            phone: `phone-${random()}`,
            features: { wifi: true, parking: true, coffee: true, meetingRooms: true },
            description: `description-${random()}`,
            capacity: random(),
        }

        await Workspace.create(workspaceRandom)
            .then(({ id }) => { workspaceId = id })

    })

    it('should succeed on valid workspaceId', async () => {
        const result = await toggleFavorites(userId, workspaceId)

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


        const result = await toggleFavorites(userId, workspaceId)

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

            const results = await toggleFavorites(userId, workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(UnexistenceError)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
    })
    describe('when workspace does not exist', () => {
        beforeEach(async () =>
            await Workspace.deleteMany()
        )

        it('should fail on any workspaces to toggle fav', async () => {

            const results = await toggleFavorites(userId, workspaceId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(UnexistenceError)
                    expect(error.message).to.equal(`workspace with id ${workspaceId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})