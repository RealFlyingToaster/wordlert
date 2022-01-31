// score module
module.exports = {
    score: (test, answer) => {
        if (test.length !== 5 || answer.length !== 5) {
            throw ('Five letter words required.');
        }

        let accountedFor = [false, false, false, false, false],
            result = ['x', 'x', 'x', 'x', 'x'];

        //// 1) is each letter simply not in the word?
        //for (i = 0; i < 5; i++) {
        //    if (!answer.includes(test.charAt(i))) {
        //        result[i] = 'x';
        //    }
        //}

        // 2) is each letter in the correct place?
        for (i = 0; i < 5; i++) {
            if (answer.charAt(i) === test.charAt(i)) {
                result[i] = 'g';
                accountedFor[i] = true; // so we don't count it again for a yellow.
            }
        }

        // 3) is each test letter elsewhere in the answer?
        for (i = 0; i < 5; i++) {
            let testLetter = test.charAt(i),
                letterResolved = false;

            for (j = 0; j < 5 && !letterResolved; j++) {
                if (!accountedFor[j] && (answer.charAt(j) === testLetter)) {
                    accountedFor[j] = true;
                    result[i] = 'y';
                    letterResolved = true;
                }
            }
        }

        return result.join('');
    }
}