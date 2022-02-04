// answers module.
const fs = require('fs'),
    path = require('path'),
    score = require('./score'),
    _answerList = fs.readFileSync(path.resolve(__dirname, '../data/answers.txt'), 'utf8').split('\r\n');
//console.log(JSON.stringify(_answerList));

module.exports = {
    answers: _answerList,
    getRandomAnswer: () => {
        return _answerList[Math.floor(Math.random() * _answerList.length)];
    },
    // return array of all words that match the facts.
    match: (guesses) => {
        //console.log(`Guesses: ${JSON.stringify(guesses)}`);

        if (0 === guesses.length)
            return _answerList;

        let results = _answerList;

        guesses.forEach((guess) => {
            //console.log(`Guess: ${JSON.stringify(guess)}`);
            // guess = { word, score }
            let nextResults = [];

            // does each candidate word score the same vs. this guess?
            results.forEach((test) => {
                if (score.score(guess.word, test) === guess.score) {
                    nextResults.push(test);
                }
            });
            //console.log(`${nextResults.length} also match ${guess.word} = ${guess.score}`);
            results = nextResults;
        });

        return results; // all words that match the collective pattern.
    }
}