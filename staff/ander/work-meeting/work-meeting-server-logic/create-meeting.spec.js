require('dotenv').config();
const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET, JWT_EXPIRACY } } = process;
const { floor, random } = Math;
const createMeeting = require('./create-meeting');
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons');
const { mongoose, models: { Meeting, User, WorkGroup } } = require('work-meeting-data');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');



describe('createMeeting', () => {
    //User-oriented variables
    let name, surname, email, password, encryptedPassword, userId;

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
            const result = await createMeeting(userId,workGroupId, title, content);
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
                await createMeeting(userId,workGroupId, title, content);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(DuplicityError);
                expect(error.message).to.equal(`meeting with id ${newMeeting.id.toString()} already exists`);
            }
        });

        it('should fail to create a meeting if the user does not exist', async() => {
            await User.deleteMany();

            try {
                await createMeeting(userId,workGroupId, title, content);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(UnexistenceError);
                expect(error.message).to.equal(`user with id ${userId} does not exist`);
            }
        });
        it('should fail to create a meeting if the workGroup does not exist', async() => {
            await WorkGroup.deleteMany();

            try {
                await createMeeting(userId,workGroupId, title, content);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(UnexistenceError);
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`);
            }
        });
    });

    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            userId = random();
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = undefined;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = [];
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = false;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = null;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = {};
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${userId} is not a string`);
        });
        it('should fail on a non-string userId', () => {
            workGroupId = random();
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = undefined;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = [];
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = false;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = null;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
            
            workGroupId = {};
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);
        });
        
        it('should fail on a non-string title', () => {
            userId = 'some userId';

            title = random();
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = undefined;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = [];
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = false;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = null;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
            
            title = {};
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${title} is not a string`);
        });

        it('should fail on a non-string content', () => {
            title = 'some title';

            content = random();
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = undefined;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = [];
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = false;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = null;
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
            
            content = {};
            expect(() => createMeeting(userId,workGroupId, title, content)).to.throw(TypeError, `${content} is not a string`);
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