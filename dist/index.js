#! /usr/bin/env node
import figlet from "figlet";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import { performOperations } from "./interface/do-operations.js";
import PromptSync from "prompt-sync";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var ID = '1402';
var name1 = 'abc';
var time = new Date();
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let again;
var new_User;
function Intro_screen() {
    console.log(gradient('cyan', 'pink').multiline(figlet.textSync(`Welcome to the \n\nMY ATM !\n`), { interpolation: 'hsv' }) + '\n');
}
Intro_screen();
const welcomeMessage = async () => {
    const rainbowTitle = chalkAnimation.rainbow("This ATM Project is Developed By Ahmed Ali Ansari PIAIC 171908");
    await sleep();
    rainbowTitle.stop();
};
// console.clear();
await welcomeMessage();
let totalAmount = 0;
const validateUserPin = (input) => {
    const pass = input.match(/^\d{4}$/);
    return pass ? true : "Invalid Pin";
};
var promptLogin = async () => {
    const userInfo = await inquirer.prompt([
        {
            type: "string",
            name: "uid",
            message: "Enter Your user Id:",
            default() {
                return null;
            },
        },
        {
            type: "password",
            name: "userPin",
            message: "Enter PIN:",
            mask: "#",
            validate: validateUserPin,
        },
    ]);
    const CheckIns = async (id, pass) => {
        const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
        let dataJSON = todoBuffer.toString();
        const arrayOfUsersIds = JSON.parse(dataJSON);
        const check1 = arrayOfUsersIds.find((el) => { return el.count == userInfo.uid; });
        const check2 = arrayOfUsersIds.find((el) => { return el.pass == userInfo.userPin; });
        if (check1 && check2) {
            name1 = arrayOfUsersIds.filter((x) => x.count == id).map((x) => x.name);
            console.log(`LOGIN DATE & TIME : ${chalk.bgMagenta(time)}\nWelcome TO the Atm Managment System\nHave a nice Day Dear : ${chalk.bgMagenta(name1)} of ID : ${chalk.white(id)}`);
        }
        else {
            const prompt1 = PromptSync();
            var check = prompt1("Seems to be A new User since Cridentials does not Meet !Do you want to create Your Account?");
            if (check === "y") {
                var ConfirmThis = prompt1("enter your name to create Your Account !");
                new_User = { count: id, name: ConfirmThis, pass: parseInt(userInfo.userPin) };
                arrayOfUsersIds.push(new_User);
                dataJSON = JSON.stringify(arrayOfUsersIds);
                fs.writeFileSync(__dirname + "/todos.json", dataJSON);
            }
            else {
                process.exit(0);
            }
        }
    };
    CheckIns(userInfo.uid, userInfo.userPin);
    ID = userInfo.uid;
};
async function operations_to_do(uid, username) {
    const operationSelection = await inquirer.prompt([
        {
            name: "operation",
            message: "Choose an operation",
            type: "rawlist",
            choices: ["Deposit Money", "Funds Transfer", "Balance", "Withdraw", "Fast Cash", "Show Account Details", "Exit"],
        },
    ]);
    const result = await performOperations(operationSelection, totalAmount, uid, username);
    totalAmount = result;
    console.log(`\n${chalk.magenta("Available Amount: ")} ${totalAmount}`);
}
await promptLogin();
do {
    await operations_to_do(ID, name1);
    const { confirm } = await inquirer.prompt([
        {
            name: "confirm",
            message: "Do you want to continue?",
            type: "confirm",
        },
    ]);
    again = confirm;
} while (again);
