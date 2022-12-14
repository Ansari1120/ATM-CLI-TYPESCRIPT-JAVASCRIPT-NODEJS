import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
export const performOperations = async ({ operation }, totalAmount, uid, username) => {
    const spinner = createSpinner("Perform Operation");
    let result = 0;
    const validateInput = (input) => {
        if (isNaN(parseInt(input)) || input === "") {
            return "Not a valid amount\n Note : You're Either input data apart from numaric \nor not giving any input";
        }
        else {
            return true;
        }
    };
    const depositMoney = async () => {
        const { amount } = await inquirer.prompt([
            {
                type: "string",
                name: "amount",
                message: "Enter Amount You want to deposite",
                validate: validateInput,
            },
        ]);
        return parseInt(amount);
    };
    const withDrawMoney = async () => {
        const { amount } = await inquirer.prompt([
            {
                type: "string",
                name: "amount",
                message: "Enter Amount to be withdraw",
                validate: validateInput,
            },
        ]);
        return parseInt(amount);
    };
    const Transfer = async () => {
        const { amount } = await inquirer.prompt([
            {
                type: "string",
                name: "amount",
                message: "Enter Amount to be Transfer",
            },
        ]);
        return parseInt(amount);
    };
    const Account = async () => {
        const account = await inquirer.prompt([
            {
                type: "string",
                name: "account",
                message: "Enter Account no to whom you wanna transfer funds",
                validate: validateInput,
            },
        ]);
        return account;
    };
    const Fast_cash = async () => {
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Choose Fast Cash Amount Option from below ",
                type: "rawlist",
                choices: ["1000", "2000", "3000", "5000", "10,000"]
            },
        ]);
        return parseInt(amount);
    };
    const now = new Date();
    switch (operation) {
        case "Balance":
            result = totalAmount;
            spinner.success({
                text: `Your Total Balance is: ${chalk.bgGreen(result)} /=`,
            });
            break;
        case "Deposit Money":
            const depositAmount = await depositMoney();
            result = totalAmount + depositAmount;
            spinner.success({
                text: `Your transaction completed Successfully 
        \nTransaction Time And Date : ${chalk.bgGreen(now)} \n 
        Amount Added to the account : ${chalk.bgGray(depositAmount)} /=`,
            });
            break;
        case "Withdraw":
            if (totalAmount <= 0) {
                spinner.error({
                    text: `${chalk.red("Your balance is not enough for this transaction, Please deposit some amount in your bank account")}`,
                });
            }
            else {
                const withDrawAmount = await withDrawMoney();
                result = totalAmount - withDrawAmount;
                spinner.success({
                    text: `Your transaction completed Successfully \n
          Transaction Time And Date : ${chalk.bgGreen(now)} \n 
          Amount of : ${withDrawAmount} /= is Duducted from Your Account \n 
          Your Previous Balance : ${chalk.bgYellow(totalAmount)} /=
           \n Your new Balance  : ${chalk.bgGreen(result)} /= `,
                });
            }
            break;
        case "Funds Transfer":
            const Transfer_amount = await Transfer();
            const Account_no = await Account();
            result = totalAmount - Transfer_amount;
            spinner.success({
                text: `${chalk.bgBlue("---------------Transaction Details--------------\n\n")}
          Transaction Time And Date : ${chalk.bgGreen(now)},
          FROM : 
          Account No: ${chalk.bgBlue(Account_no)}
          TO :
          Account No: ${chalk.bgCyan(Math.floor(Math.random() * 10000000000000).toString(10))}
          Account type : ${chalk.bgBlue("Current")} \n Amount Transferred : ${Transfer_amount} /= \n Now new Balance is: ${result} /= `,
            });
            break;
        case "Show Account Details":
            console.log(`
        ${chalk.bgBlue("---------------User Information--------------\n\n")}
        uid :  ${chalk.bgCyanBright(uid)}
        Account Holder Name :  ${chalk.bgGray(username)}
        Account No: ${chalk.bgCyan(Math.floor(Math.random() * 10000000000000).toString(10))}
        Account type : ${chalk.bgBlue("Current")}
        Balance : ${chalk.bgYellow(totalAmount)} /=
      `);
            result = totalAmount;
            break;
        case "Fast Cash":
            const w_option = await Fast_cash();
            result = totalAmount - w_option;
            console.log(`Amount Withdrawed : ${chalk.bgCyan(w_option)} /= \n
      Your Previous Balance : ${chalk.bgYellow(totalAmount)} /=
      \n Your new Balance  : ${chalk.bgGreen(result)} /= `);
            break;
        case "Exit":
            process.exit(0);
        default:
            return 0;
    }
    return result;
};
