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

function searchTimes(like, likePlayers) {
    var count = 0;

    for (var i = 0; i < likePlayers.length; i++) {
        if (like === likePlayers[i]) {
            count++;
        }
    }
    return {[like]: count };
}