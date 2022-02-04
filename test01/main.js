const answers = require('../lib/answers'),
    score = require('../lib/score'),
    guessFrom = (universe) => {
        return universe[Math.floor(Math.random() * universe.length)];
    };

let answer = answers.getRandomAnswer(),
    guesses = [],
    correct = false;

while (!correct) {
    let matches = answers.match(guesses),   // array of all words that match the facts.
        guess = guessFrom(matches),
        ascore = score.score(guess, answer);

    guesses.push({ word: guess, score: ascore });
    correct = ascore === 'ggggg';
    console.log(`${guess} ${ascore} (${matches.length})`);
}
