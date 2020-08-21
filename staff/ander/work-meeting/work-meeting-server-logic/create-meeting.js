require('work-meeting-commons/polyfills/string')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { models: { User, Meeting } } = require('work-meeting-data');
const { WorkGroup } = require('work-meeting-data/models');

/**
 * create a new meeting with title, content and user Id
 * @param {string} title title of the meeting
 * @param {string} content meeting content
 * @param {string} userId user's unique ID
 * 
 * @returns {Promise<void>} returns an empty promise on a successful creation
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if meeting already exist
 * @throws {TypeError} Throws an error if meeting not create
 * @throws {UnexistenceError} if the user does not exist on the database
 * @throws {DuplicityError} if the meeting already exists on the user
 * 
 */
module.exports = (userId, workGroupId ,title, content) => {
    String.validate.notVoid(userId);
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(title);
    String.validate.notVoid(content);

    return (async() => {
        const [user, workGroup, meeting] = await Promise.all([
            User.findById(userId), WorkGroup.findById(workGroupId),
            Meeting.findOne({ host: userId, title })
        ]);

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        if (meeting) throw new DuplicityError(`meeting with id ${meeting.id.toString()} already exists`);
        if(!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
        const newMeeting = await Meeting.create({ title, content, host: userId, workGroup: workGroupId });

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                host: newMeeting.id
            }
        });

        return;
    })();
}