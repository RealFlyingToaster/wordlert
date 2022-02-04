const puppeteer = require('puppeteer'),
    answers = require('../lib/answers'),
    score = require('../lib/score'),
    guessFrom = (universe) => {
        return universe[Math.floor(Math.random() * universe.length)];
    },
    evaluationMap = { absent: 'x', present: 'y', correct: 'g' },
    scoreFromEvaluation = (evaluation) => { // array of 'absent', 'present', 'correct'
        return evaluation.map((e) => evaluationMap[e]).join('');
    };

const asyncTimeout = (timeout) =>
    new Promise((resolve) => setTimeout(() => resolve(), timeout));
const clickModalCloseButton = async (page) => {
    await page.evaluate((_) => {
        document
            .querySelector('game-app')
            .shadowRoot.querySelector('game-modal')
            .shadowRoot.querySelector('game-icon[icon="close"]')
            .click();
    });

    await asyncTimeout(500);
};

(async () => {
    const browser = await puppeteer.launch({
        headless: true, //false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.powerlanguage.co.uk/wordle/', { waitUntil: 'networkidle2' } );
    await page.waitForTimeout(500);
    await clickModalCloseButton(page);
    //await page.click('body')
    //    .catch(() => {console.log('nope')});
    //await page.waitForTimeout(500);

    let guesses = [],
        correct = false;

    while (!correct) {
        let matches = answers.match(guesses),   // array of all words that match the facts.
            guess = guessFrom(matches);

        // type at the game.
        await page.keyboard.type(guess, { delay: 100 });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);

        // read out the game state.
        const gameState = JSON.parse(await page.evaluate(() => {
            return localStorage.getItem('gameState');
        }));
        //console.log(gameState);

        let evaluation = gameState.evaluations[guesses.length],
            ascore = scoreFromEvaluation(evaluation);

        guesses.push({ word: guess, score: ascore });
        correct = ascore === 'ggggg';
        console.log(`${guess} ${ascore} (${matches.length})`);
    }

    //await page.keyboard.type('parse', { delay: 100 });
    //await page.keyboard.press('Enter');
    //await page.waitForTimeout(2000);
    //await page.keyboard.type('fling', { delay: 100 });
    //await page.keyboard.press('Enter');
    //await page.waitForTimeout(2000);

    // trying to read out the board.
    //const bodyHandle = await page.$('body');
    //const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    //await bodyHandle.dispose();
    //console.log('1: ' + html);
    //const html2 = await page.$eval('game-app', (e) => { return e.innerHTML });
    //console.log('2: ' +
    //    html2);
    //const html3 = await page.evaluate(() => { return document.querySelector('body').innerHTML; });
    //console.log('3: ' + html3);
    //const frame = page.mainFrame();
    //const text = await frame.$eval('game-row', (element) => element.getAttribute('letters'));
    //const text = await frame.$eval('div.tile', (element) => element.getAttribute('data-state'));
    //console.log(text);

    //// ok, hack game state
    //const gameState = await page.evaluate(() => {
    //    return localStorage.getItem('gameState');
    //});
    await page.waitForTimeout(2500);
    await clickModalCloseButton(page);
    await page.screenshot({ path: 'wordle.png' });

    await browser.close();
})();