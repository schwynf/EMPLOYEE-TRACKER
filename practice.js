// const mysql = require("mysql2/promise");
// const colors = require("colors");
// const inquirer = require("inquirer");
// const arrayList = require("./objec.js")

// let idChoice;
// const main = async () => {
//     try {
//         var connection = await mysql.createConnection({
//             host: "localhost",
//             port: 3306,
//             user: "root",
//             password: "password",
//             database: "personnel_DB"
//         });
//         console.log("connected as id " + colors.magenta(connection.threadId));
//         let info = await start();
//         console.log("main funciton recieved " + info.employeeTitle);
//         if (info.index < 4){
//             if (info.index === 1) {
//                 info.sqlScript = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary FROM employee INNER JOIN roles ON (employee.role_id = roles.id) INNER JOIN department ON (roles.department_id = department.id) WHERE (roles.title: ${info.employeeTitle})`
//             }
//             await readCar(connection, info.sqlScript);

//         }else if(info.index < 6){
//             await updateProduct(connection, info.sqlScript, info.saveName);
//         }
//         connection.end();
//     } catch (err) {
//         console.log(err);
//     }
// };


// let start = async () => {
//     let info;
//     await inquirer
//         .prompt({
//             type: "checkbox",
//             message: "Which employee info do you wish to choose?",
//             name: "userChoice",
//             choices: [
//                 arrayList[0].choice,
//                 arrayList[1].choice,
//                 arrayList[2].choice,
//                 arrayList[3].choice,
//                 arrayList[4].choice,
//                 "Update Role",
//                 "Add Role",
//                 "Add Employee",
//                 "Add Department",
//                 "Remove Employee",
//                 "Remove Role",
//                 "Remove Department",
//                 "Total Utilized Budget by Department",
//                 "Exit"
//             ]
//         })
//         .then(async (data) => {
//             console.log("Employee choose to " + data.userChoice[0]);
//             let choiceIndex;
//             for (let i = 0; i < arrayList.length; i++) {
//                 if (data.userChoice[0] === arrayList[i].choice) {
//                     choiceIndex = i;
//                 }
//             }
//             console.log(choiceIndex);
//             info = await arrayList[choiceIndex].pick();
//             console.log(info);
//         });
//     return info;
// }

// const readCar = async (connection, y) => {
//     const sqlQuery = y;
//     const [rows, fields] = await connection.query(sqlQuery);
//     console.table(rows[0].index);
//     console.log(rows.length);
//     console.log(colors.bgYellow.red(rows));
// };

// const updateProduct = async (connection,y,x) => {
//     console.log("updating.......")
//     const sqlQuery = y;
//     const params = x;

//     const [rows, fields] = await connection.query(sqlQuery, params);
//     console.log(rows);
// }
// main();


// connection.query('SELECT * FROM department', function (err, res) {
//     if (err) throw err;
// })


// type: "checkbox",
// message: "Which employee info do you wish to choose?",
// name: "userChoice",
// choices: [
   
// ]










// await connection.query('SELECT * FROM department', async function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     let choiceIndex;
//     for (let i = 0; i < arrayList.length; i++) {
//         if (data.userChoice[0] === arrayList[i].choice) {
//             choiceIndex = i;
//         }
//     }
//     console.log(choiceIndex);
//     p = await arrayList[choiceIndex].pick(res);
//     console.log(p);
//     if (p.index < 4) {
//         if (p.index === 1) {
//             p.sqlScript = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary FROM employee INNER JOIN roles ON (employee.role_id = roles.id) INNER JOIN department ON (roles.department_id = department.id) WHERE (roles.department_id = ${p.employeeTitle})`;
//         }
//         await readCar(connection, p.sqlScript);

//     } else if (p.index < 6) {
//         await updateProduct(connection, p.sqlScript, p.saveParam);
//     }
//     await start(connection);
//     connection.end();
// })


