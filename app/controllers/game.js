/**
 * Created by garima05 on 31-10-2016.
 */

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
// @ref : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//@Scenario : Server must be able to receive requests from client and return an outcome (three random integers between 0-5).
function getRandomSymbols() {
    return [
        getRandomIntInclusive(0, 5),
        getRandomIntInclusive(0, 5),
        getRandomIntInclusive(0, 5)
    ];
}

//@Scenario : There must be three types of outcomes: No Win, Small Win, Big Win. Two equal integers constitutes a Small Win. Three equal integers constitutes a Big Win.
function computeWinType(symbols) {
    var win = "NoWin";

    if ((symbols[0] === symbols[1]) && (symbols[1] === symbols[2])) {

        // all three symbols are same
        win = "BigWin";
    } else if ((symbols[0] === symbols[1]) || (symbols[0] === symbols[2]) || (symbols[1] === symbols[2])) {
        //	2 out of 3 symbols are same
        win = "SmallWin";
    }
    return win;
}

//@Scenario : Server must randomly (in addition to the outcome) return if bonus feature should be triggered or not.
function getRandomRespinBonus() {
    // here we can have multiple options to get bonus, one option could be based on win, based on true/flase randomly, based on symbol in win
    // I use a random number selection irrespective of the spin result with less weightage.

    var selectRandomNumber = getRandomIntInclusive(0, 10);
    // generate repin bonus if selectedNumber is 5;
    return (selectRandomNumber >= 5);
}

module.exports = {
    spin: function() {
        const symbols = getRandomSymbols();
        const spinResult = {
            symbols: symbols,
            win: computeWinType(symbols),
            respinBonus: getRandomRespinBonus()
        };
        return spinResult;
    }
};