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
                arrayList[6].choice,
                arrayList[7].choice,
                arrayList[8].choice,
                arrayList[9].choice,
                arrayList[10].choice,
                arrayList[11].choice,
                "Total Utilized Budget by Department",
                arrayList[13].choice
            ]
        })
        .then(async (data) => {
            let choiceIndex;
            for (let i = 0; i < arrayList.length; i++) {
                if (data.userChoice[0] === arrayList[i].choice) {
                    choiceIndex = i;
                }
            }
            //checking which table view the user needs
            if (choiceIndex < 4 || choiceIndex === 6 || choiceIndex === 8 || choiceIndex === 11 || choiceIndex === 12) {
                await getDepartment(connection, choiceIndex);
            } else if (choiceIndex === 4 || choiceIndex === 5 || choiceIndex === 7 || choiceIndex === 10) {
                await getRoles(connection, choiceIndex);
            } else if (choiceIndex === 9) {
                await getEmployee(connection, choiceIndex);
            } else if (choiceIndex === 13) {
                connection.end();
            } else {

            }
        });
};
////////////////////////////////////
/////////////////////////////////
//get employee table to help user enter information
async function getEmployee(connection, choiceIndex) {
    await connection.query('SELECT * FROM employee', async function (err, res) {
        if (err) throw err;
        p = await arrayList[choiceIndex].pick(res);
        if (p.index === 9) {
            console.log(p);
            await removeTable(connection, p.sqlScript, p.saveParam);
        }
    });
};

//////////////////////////////////////////////
//////////////////////////////////////////////
//get department table to help user enter information
async function getDepartment(connection, choiceIndex) {
    await connection.query('SELECT * FROM department', async function (err, res) {
        if (err) throw err;
        p = await arrayList[choiceIndex].pick(res);
        if (p.index < 4 || p.index === 12) {
            await readTable(connection, p.sqlScript);
        } else if (p.index === 11) {
            console.log(p);
            await removeTable(connection, p.sqlScript, p.saveParam);
        } else {
            console.log(p);
            await addTable(connection, p.sqlScript, p.saveParam);
        }
    });
};

////////////////////////////////////////////////
///////////////////////////////////////////////
//get roles table to help user enter information
async function getRoles(connection, choiceIndex) {
    await connection.query('SELECT * FROM roles', async function (err, res) {
        if (err) throw err;
        p = await arrayList[choiceIndex].pick(res);
        console.log(p);
        if (p.index === 7) {
            await addTable(connection, p.sqlScript, p.saveParam);
        } else if (p.index === 10) {
            await removeTable(connection, p.sqlScript, p.saveParam);
        } else {
            await updateTable(connection, p.sqlScript, p.saveParam);
        }

    });
};

//reading specific information from mySQL database
const readTable = async (connection, script) => {
    console.log(colors.bgGreen.red.bold(script));
    console.log("reading........")
    const sqlQuery = script;
    const [rows, fields] = await connection.query(sqlQuery);
    console.table(rows);
    if (p.index === 12) {
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
    const sqlQuery = script;
    const params = values;
    const [rows, fields] = await connection.query(sqlQuery);
    console.table(rows);
    start(connection);
};

//updating information into mySQL database
const updateTable = async (connection, script, values) => {
    console.log("updating.......")
    const sqlQuery = script;
    const params = values;
    const [rows, fields] = await connection.query(sqlQuery, params);
    console.table(rows);
    start(connection);
};

//removing information from mySQL database
const removeTable = async (connection, script, values) => {
    console.log("removing.......")
    const sqlQuery = script;
    const params = values;
    const [rows, fields] = await connection.query(sqlQuery, params);
    console.table(rows);
    start(connection);
};
main();
