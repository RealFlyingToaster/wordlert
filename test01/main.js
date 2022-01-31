const answers = require('../lib/answers'),
    score = require('../lib/score');

let answer = answers.getRandomAnswer(),
    guess = answers.getRandomAnswer(),
    ascore = score.score(guess, answer);

console.log(`${answer} ${guess} ${ascore}`);