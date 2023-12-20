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
    // contains all the available symbols
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLUMNS; i++) {
        reels.push([]);
        // below is a copy of the symbols array
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            // generates random number in order to use it to select a specific index
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            // adding the random symbol
            reels[i].push(selectedSymbol);
            // removes the random symbol from the reelsymbols array
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLUMNS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance = depositMoney();

    while (true) {
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
            const bet = getTotalBet(balance, numberOfLines);
            balance -= bet * numberOfLines;

        const playGame = spin();
        const rows = transpose(playGame);
        printRows(rows);
            const winnings = getWinnings(rows, bet, numberOfLines);
            balance += winnings;
        console.log("You won, $" + winnings.toString() + "!");

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? (Y/N) ").toLowerCase();
        if (playAgain != "y") break
    };
};

game();

