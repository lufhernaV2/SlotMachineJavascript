/*
1. Deposit Money
2. Determine number of lines to bet on
3. Collect a bet amount
4. Spin the slot machine
5. Check if the user won
6. Give the user their winnings
7. Play again
*/

const prompt = require("prompt-sync")();
// global variables
const ROWS = 3;
const COLUMNS = 3;
// symbols that you can have in each reel and each columns
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};
// value of each symbol and what it is going to be multiplied by
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const depositMoney = () => {
    while (true) {
        const depositAmount = prompt('Enter a deposit amount: ');
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log('Invalid deposit amount, try again!');
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt('Enter the number of lines to bet on (1 - 3): ');
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log('Invalid number of lines, try again!');
        } else {
            return numberOfLines;
        }
    }
};

const getTotalBet = (balance, lines) => {
    while (true) {
        const bet = prompt(`Enter the total bet per line. You have ${lines} lines to bet on: `);
        const betNumber = parseFloat(bet);

        if (isNaN(betNumber) || betNumber <= 0 || betNumber > balance / lines) {
            console.log('Enter a valid bet please!');
        } else {
            return betNumber;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        console.log(symbol, count);
    }
}

// let balance = depositMoney();
// const numberOfLines = getNumberOfLines();
// const bet = getTotalBet(balance, numberOfLines);
const playGame = spin();
