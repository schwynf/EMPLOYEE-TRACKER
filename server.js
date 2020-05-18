const mysql = require("mysql2/promise");
const colors = require("colors");
const inquirer = require("inquirer");
const arrayList = require("./objec.js");
const cTable = require("console.table")

let info;
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
            }else if(choiceIndex === 4){
                await fifthResponse(connection,choiceIndex);
            }else if(choiceIndex === 5){
                await sixthResponse(connection,choiceIndex);
            }


        });
};


const readCar = async (connection, y) => {
    const sqlQuery = y;
    const [rows, fields] = await connection.query(sqlQuery);
    console.table(rows);
    start(connection);
};

const updateProduct = async (connection, y, x) => {
    console.log("updating.......")
    const sqlQuery = y;
    const params = x;
    const [rows, fields] = await connection.query(sqlQuery, params);
    console.table(rows);
    start(connection);
}
main();


async function firstFour(connection, choiceIndex) {
    await connection.query('SELECT * FROM department', async function (err, res) {
        if (err) throw err;
        p = await arrayList[choiceIndex].pick(res);
        if (p.index === 1) {
            p.sqlScript = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary FROM employee INNER JOIN roles ON (employee.role_id = roles.id) INNER JOIN department ON (roles.department_id = department.id) WHERE (roles.department_id = ${p.employeeTitle})`;
        }
        await readCar(connection, p.sqlScript);
    })
}

async function fifthResponse(connection, choiceIndex) {
    await connection.query('SELECT * FROM roles', async function (err, res) {
        if (err) throw err;
        console.log(choiceIndex);
        p = await arrayList[choiceIndex].pick(res);
        console.log(p);
        await updateProduct(connection,p.sqlScript,p.saveParam);
    })
}

async function sixthResponse(connection, choiceIndex) {
    await connection.query('SELECT * FROM roles', async function (err, res) {
        if (err) throw err;
        console.log(choiceIndex);
        p = await arrayList[choiceIndex].pick(res);
        console.log(p);
        await updateProduct( connection,p.sqlScript,p.saveParam); 
    })
}

// let info;
// let p;
// const main = async () => {
//     let x = "\'CustomerService\'";
//     let y = 25;
//     try {
//         var connection = await mysql.createConnection({
//             host: "localhost",
//             port: 3306,
//             user: "root",
//             password: "password",
//             database: "personnel_DB"
//         });
//         console.log("connected as id " + colors.magenta(connection.threadId));
//         const [rows, fields] = await connection.query(`UPDATE roles
//         SET title=${x}, salary=${y}
//         WHERE id=3;`);
//         connection.end();
//     } catch (err) {
//         console.log(err);
//     }
// };
// main();

