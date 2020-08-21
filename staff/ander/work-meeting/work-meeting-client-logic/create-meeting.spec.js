require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const createMeeting = require('./create-meeting')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, Meeting, WorkGroup} } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL
const bcrypt = require('bcryptjs')


describe('createMeeting', () => {
    //User-oriented variables
    let name, surname, email, password, encryptedPassword, userId, token

    //Meeting-oriented variables
    let title, content;

    //workgroup-oriented variables
    let workgroupName, workGroupId

    before(async () => {
        await mongoose.connect(MONGODB_URL);
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            WorkGroup.deleteMany()
        ]);
    });

    beforeEach(async () => {
        //User-oriented
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id.toString();
        token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn: '1d'})
        context.storage= {token}
        //workGroup-oriented

        workgroupName= `name-${random()}`
        const workGroup = await WorkGroup.create({name:workgroupName, creator: userId})
        workGroupId = workGroup.id.toString()

        //Meeting-oriented
        title = `title-${random()}`;
        content = `content-${random()}`;
    });

    describe('asynchronous paths', () => {
        it('should succeed to create a new meeting on valid data', async () => {
            debugger
            const result = await createMeeting(workGroupId, title, content);
            debugger
            expect(result).to.be.undefined;

            const [user, meeting] = await Promise.all([
                User.findById(userId).lean(),
                Meeting.findOne({ host: userId, title, content }).lean()
            ]);

            expect(user).to.exist;
            expect(user.constructor.name).to.equal('Object');
            expect(user.host).to.be.instanceof(Array);
            expect(user.host.length).to.equal(1);
            expect(user.host[0].toString()).to.equal(meeting._id.toString());

            expect(meeting).to.exist;
            expect(meeting.constructor.name).to.equal('Object');
            expect(meeting.title).to.equal(title);
            expect(meeting.content).to.equal(content);
            expect(meeting.host.toString()).to.equal(userId);
            expect(meeting.workGroup.toString()).to.equal(workGroupId);
        });

        it('should fail to create a meeting if the user already created that same meeting', async () => {
            const newMeeting = await Meeting.create({ title, workGroup: workGroupId, content, host: userId });

            await User.findByIdAndUpdate(userId, {
                $addToSet: {
                    host: newMeeting.id
                }
            });

            try {
                await createMeeting(workGroupId, title, content);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.equal(`meeting with id ${newMeeting.id.toString()} already exists`);
            }
        });

        it('should fail to create a meeting if the user does not exist', async() => {
            await User.deleteMany();

            try {
                await createMeeting(workGroupId, title, content);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.equal(`user with id ${userId} does not exist`);
            }
        });
        it('should fail to create a meeting if the workGroup does not exist', async() => {
            await WorkGroup.deleteMany();

            try {
                await createMeeting(workGroupId, title, content);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`);
            }
        });
    });

    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            token = random();
            context.storage = {token}
            expect(() => createMeeting(workGroupId, title, content)).to.throw(Error, `${token} is not a string`);
            
            token = undefined;
            context.storage = {token}
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${token} is not a string`);
            
            token = [];
            context.storage = {token}
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${token} is not a string`);
            
            token = false;
            context.storage = {token}
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${token} is not a string`);
            
            token = null;
            context.storage = {token}
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${token} is not a string`);
            
            token = {};
            context.storage = {token}
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${token} is not a string`);
        });
        it('should fail on a non-string workGroupId', () => {
            workGroupId = random();
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = undefined;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = [];
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = false;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = null;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = {};
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
        });
        
        it('should fail on a non-string title', () => {
            userId = 'some userId';

            title = random();
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = undefined;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = [];
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = false;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = null;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = {};
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
        });

        it('should fail on a non-string content', () => {
            title = 'some title';

            content = random();
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = undefined;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = [];
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = false;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = null;
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = {};
            expect(() => createMeeting(workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
        });

    });

    afterEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            WorkGroup.deleteMany()
        ]);
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            WorkGroup.deleteMany()
        ]);
        await mongoose.disconnect();
    })
});