const mysql = require("mysql2/promise");
const colors = require("colors");
const inquirer = require("inquirer");
const optionList = require("./optionList.js");
const consoleTable = require("console.table")
let arrayPick;


const main = async () => {
    try {
           let connection = await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "personnel_DB"
        });
        console.log("connected as id " + colors.magenta(connection.threadId));
        start(connection);
    } catch (err) {
        console.log(err);
    }
};

main();

let start = (connection) => {
    inquirer
        .prompt({
            type: "checkbox",
            message: "Which employee info do you wish to choose?",
            name: "userChoice",
            choices: [
                optionList[0].choice,
                optionList[1].choice,
                optionList[2].choice,
                optionList[3].choice,
                optionList[4].choice,
                optionList[5].choice,
                optionList[6].choice,
                optionList[7].choice,
                optionList[8].choice,
                optionList[9].choice,
                optionList[10].choice,
                optionList[11].choice,
                optionList[12].choice,
                optionList[13].choice
            ]
        })
        .then((data) => {
            let choiceIndex;
            for (let i = 0; i < optionList.length; i++) {
                if (data.userChoice[0] === optionList[i].choice) {
                    choiceIndex = i;
                }
            }
            //checking which table view the user needs
            if (choiceIndex < 4 || choiceIndex === 6 || choiceIndex === 8 || choiceIndex === 11 || choiceIndex === 12) {
                getDepartment(connection, choiceIndex);
            } else if (choiceIndex === 4 || choiceIndex === 5 || choiceIndex === 7 || choiceIndex === 10) {
                getRoles(connection, choiceIndex);
            } else if (choiceIndex === 9) {
                getEmployee(connection, choiceIndex);
            } else if (choiceIndex === 13) {
                connection.end();
            } else {
                start(connection)
            } 
        });
};

//get employee table to help user enter information
async function getEmployee(connection, choiceIndex) {
    connection.query('SELECT * FROM employee', async function (err, res) {
        if (err) throw err;
        arrayPick = await optionList[choiceIndex].pick(res);
        console.log(arrayPick);
        await removeTable(connection, arrayPick.sqlScript, arrayPick.saveParam);
    });
};

//get department table to help user enter information
async function getDepartment(connection, choiceIndex) {
    connection.query('SELECT * FROM department', async function (err, res) {
        if (err) throw err;
        arrayPick = await optionList[choiceIndex].pick(res);
        if (arrayPick.index < 4 || arrayPick.index === 12) {
            readTable(connection, arrayPick.sqlScript);
        } else if (arrayPick.index === 11) {
            console.log(arrayPick);
            removeTable(connection, arrayPick.sqlScript, arrayPick.saveParam);
        } else {
            console.log(arrayPick);
            addTable(connection, arrayPick.sqlScript, arrayPick.saveParam);
        }
    });
};

//get roles table to help user enter information
async function getRoles(connection, choiceIndex) {
        connection.query('SELECT * FROM roles', async function (err, res) {
        if (err) throw err;
        const [rows, fields] = await connection.query('SELECT * FROM department');
        arrayPick = await optionList[choiceIndex].pick(res,rows);
        console.log(arrayPick);
        if (arrayPick.index === 7) {
            addTable(connection, arrayPick.sqlScript, arrayPick.saveParam);
        } else if (arrayPick.index === 10) {
            removeTable(connection, arrayPick.sqlScript, arrayPick.saveParam);
        } else {
            updateTable(connection, arrayPick.sqlScript, arrayPick.saveParam);
        }

    });
};

//reading specific information from mySQL database
const readTable = async (connection, script) => {
    console.log(colors.bgGreen.red.bold(script));
    console.log("reading........")
    const [rows, fields] = await connection.query(script);
    console.table(rows);
    if (arrayPick.index === 12) {
        let total = 0;
        for (let i = 0; i < rows.length; i++) {
            total += JSON.parse(rows[i].salary);
        }
        console.log(`The total utilized budget is $${total}.`);
    }
    start(connection);
};

//adding information into mySQL database
const addTable = async (connection, script, values) => {
    console.log("adddingggg.......")
    const [rows, fields] = await connection.query(script);
    console.log(rows);
    start(connection);
};

//updating information into mySQL database
const updateTable = async (connection, script, values) => {
    console.log("updating.......")
    const [rows, fields] = await connection.query(script, values);
    console.table(rows);
    start(connection);
};

//removing information from mySQL database
const removeTable = async (connection, script, values) => {
    console.log("removing.......");
    const [rows, fields] = await connection.query(script, values);
    console.table(rows);
    start(connection);
};

