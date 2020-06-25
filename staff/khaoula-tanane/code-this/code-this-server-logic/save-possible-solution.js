const { models: { Challenge, User } } = require('code-this-data')

module.exports = function (userId, challengeId, solution) {
    return Challenge.findOne({ _id: challengeId }).lean()
        .then(challenge => {
            if (!challenge) throw new Error(`challenge with id ${challengeId} does not exist`)

            let {solutions = []} = challenge
            solutions.push({userId, solution})

            solutions = [...new Set(solutions.map(_solution => JSON.stringify(_solution)))].map(_solution => JSON.parse(_solution))

            return User.findOne({ _id: userId}).lean()
                .then(user => {
                    return User.findOneAndUpdate(
                        { _id: userId },
                        {score: user.score + challenge.score},
                        function(err, userUpdate) {
                            return Challenge.findOneAndUpdate(
                                { _id: challengeId },
                                {solutions},
                                function(err, challengeUpdate) {
                                    return challengeUpdate;
                                }
                            )
                        }
                    )
                })
        }).catch(error => {throw new Error(error.message)})
}