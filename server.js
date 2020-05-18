const mysql = require("mysql2/promise");
const colors = require("colors");
const inquirer = require("inquirer");
const arrayList = require("./objec.js");
const cTable = require("console.table")

let p;
const main = async () => {
    try {
        var connection = await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "personnel_DB"
        });
        console.log("connected as id " + colors.magenta(connection.threadId));
        await start(connection);
        connection.end();
    } catch (err) {
        console.log(err);
    }
};


let start = async (connection) => {
    await inquirer
        .prompt({
            type: "checkbox",
            message: "Which employee info do you wish to choose?",
            name: "userChoice",
            choices: [
                arrayList[0].choice,
                arrayList[1].choice,
                arrayList[2].choice,
                arrayList[3].choice,
                arrayList[4].choice,
                arrayList[5].choice,
                "Add Role",
                "Add Employee",
                "Add Department",
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                "Total Utilized Budget by Department",
                "Exit"
            ]
        })
        .then(async (data) => {
            let choiceIndex;
            for (let i = 0; i < arrayList.length; i++) {
                if (data.userChoice[0] === arrayList[i].choice) {
                    choiceIndex = i;
                }
            }
            if (choiceIndex < 4) {
                await firstFour(connection, choiceIndex);
            } else if (choiceIndex === 4 || choiceIndex === 5) {
                await fifthResponse(connection, choiceIndex);
            }
        });
};
//////////////////////////////////////////////
//////////////////////////////////////////////
//reading
async function firstFour(connection, choiceIndex) {
    await connection.query('SELECT * FROM department', async function (err, res) {
        if (err) throw err;
        p = await arrayList[choiceIndex].pick(res);
        await readTable(connection, p.sqlScript);
    });
};

const readTable = async (connection, script) => {
    console.log(script);
    console.log("reading........")
    const sqlQuery = script;
    const [rows, fields] = await connection.query(sqlQuery);
    console.table(rows);
    start(connection);
};
////////////////////////////////////////////////
///////////////////////////////////////////////
//updataing
async function fifthResponse(connection, choiceIndex) {
    await connection.query('SELECT * FROM roles', async function (err, res) {
        if (err) throw err;
        p = await arrayList[choiceIndex].pick(res);
        console.log(p);
        await updateTable(connection, p.sqlScript, p.saveParam);
    });
};

const updateTable = async (connection, script, values) => {
    console.log("updating.......")
    const sqlQuery = script;
    const params = values;
    const [rows, fields] = await connection.query(sqlQuery, params);
    console.table(rows);
    start(connection);
};

main();




