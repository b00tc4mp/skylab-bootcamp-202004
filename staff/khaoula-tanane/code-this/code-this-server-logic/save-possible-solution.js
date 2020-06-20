const { models: { Challenge } } = require('code-this-data')

module.exports = function (userId, challengeId, solution) {

    return Challenge.findOne({ _id: challengeId }).lean()
        .then(challenge => {
            if (!challenge) throw new Error(`challenge with id ${challengeId} does not exist`)

            let {solutions} = challenge
            solutions.push({userId, solution})

            solutions = [...new Set(solutions.map(_solution => JSON.stringify(_solution)))].map(_solution => JSON.parse(_solution))

            return Challenge.findOneAndUpdate(
                { _id: challengeId },
                {solutions},
                { new: true, upsert: true, setDefaultsOnInsert: true },
                function(err, challengeUpdate) {
                    return challengeUpdate;
                }
            );
        }).catch(error => console.log(error))

}