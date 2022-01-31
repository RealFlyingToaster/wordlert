// answers module.
const fs = require('fs'),
    path = require('path'),
    _answerList = fs.readFileSync(path.resolve(__dirname, '../data/answers.txt'), 'utf8').split('\r\n');
//console.log(JSON.stringify(_answerList));

module.exports = {
    answers: _answerList,
    getRandomAnswer: () => {
        return _answerList[Math.floor(Math.random() * _answerList.length)];
    }
}