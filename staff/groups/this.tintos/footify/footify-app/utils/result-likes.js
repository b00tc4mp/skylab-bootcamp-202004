/**
 * Checks user credentials.
 * 
 * @param {Object} likePlayers is an Array of idPlayers. 
 * 
 * @returns {object} return a array with {idPlayers : numberOfLikes}
 * 
 */



function results(likePlayers) {
    
    var auxLikes = [];
    var result = [];
    for (var i = 0; i < likePlayers.length; i++) {
        if (!auxLikes.includes(likePlayers[i])) {
            auxLikes.push(likePlayers[i]);
            result.push(searchTimes(likePlayers[i], likePlayers));
        }
    }
    return result;
}

/**
 * Checks number of times like.
 * 
 * @param {Object} likePlayers is an Array of idPlayers. 
 * @param {String} like is an only idPlayers. 
 * 
 * @returns {object} return a singular object with {idPlayers'(like)' : numberOfLikes}
 * 
 */
function searchTimes(like, likePlayers) {
    var count = 0;

    for (var i = 0; i < likePlayers.length; i++) {
        if (like === likePlayers[i]) {
            count++;
        }
    }
    return {[like]: count };
}