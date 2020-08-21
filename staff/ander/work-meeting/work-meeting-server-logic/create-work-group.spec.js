require('dotenv').config();
const { env: { TEST_MONGODB_URL: MONGODB_URL} } = process;
const { floor, random } = Math;
const createWorkGroup = require('./create-work-group');
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons');
const { mongoose, models: { WorkGroup, User } } = require('work-meeting-data');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');


describe('createWorkGroup', () => {
    //User-oriented variables
    let name, surname, email, password, encryptedPassword, userId;

    //Workgroup-oriented variables
    let _name, workGroupId

    before(async () => {
        await mongoose.connect(MONGODB_URL);
        await Promise.all([
            User.deleteMany(),
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

        //workgroup-oriented
        _name = `name-${random()}`;
       
    });

    describe('asynchronous paths', () => {
        it('should succeed to create a new work group on valid data', async () => {
            const result = await createWorkGroup(userId,_name);
            expect(result).to.be.undefined;

            const [user, workGroup] = await Promise.all([
                User.findById(userId).lean(),
                WorkGroup.findOne({name: _name, creator:userId }).lean()
            ]);

            expect(user).to.exist;
            expect(user.constructor.name).to.equal('Object');
            expect(user.workGroups).to.be.instanceof(Array);
            expect(user.workGroups.length).to.equal(1);
            expect(user.workGroups[0].toString()).to.equal(workGroup._id.toString());
            expect(user.workGroupPref.toString()).to.equal(workGroup._id.toString());
            debugger
            expect(workGroup).to.exist;
            expect(workGroup.constructor.name).to.equal('Object');
            expect(workGroup.name).to.equal(_name);
            expect(workGroup.creator.toString()).to.equal(userId);
            
        });

        it('should fail to create a workgroup if the user already created that same workgroup', async () => {
            const newWorkGroup = await WorkGroup.create({ name:_name, creator: userId});
            workGroupId= newWorkGroup.id.toString()

            await User.findByIdAndUpdate(userId, {
                $addToSet: {
                    workGroups: workGroupId
                }
            });

            try {
                await createWorkGroup(userId,_name);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(DuplicityError);
                expect(error.message).to.equal(`workgroup with name ${_name} already exist`);
            }
        });

        it('should fail to create a meeting if the user does not exist', async() => {
            await User.deleteMany();

            try {
                await createWorkGroup(userId,_name);
            } catch(error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(UnexistenceError);
                expect(error.message).to.equal(`user with id ${userId} does not exist`);
            }
        });
        
    });

    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            userId = random();
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = undefined;
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = [];
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = false;
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = null;
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${userId} is not a string`);
            
            userId = {};
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${userId} is not a string`);
        });
        
        it('should fail on a non-string name', () => {
            userId = 'some userId';

            _name = random();
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${_name} is not a string`);
            
            _name = undefined;
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${_name} is not a string`);
            
            _name = [];
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${_name} is not a string`);
            
            _name = false;
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${_name} is not a string`);
            
            _name = null;
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${_name} is not a string`);
            
            _name = {};
            expect(() => createWorkGroup(userId,_name)).to.throw(TypeError, `${_name} is not a string`);
        });

       

    });

    afterEach(async () => {
        await Promise.all([
            User.deleteMany(),
            WorkGroup.deleteMany()
        ]);
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            WorkGroup.deleteMany()
        ]);
        await mongoose.disconnect();
    })
});