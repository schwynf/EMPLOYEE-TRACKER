const inquirer = require("inquirer");
const colors = require("colors");
let idChoice;

let info;
let exportArray =
    [
        {
            choice: "View All Employees",
            sqlScript: "SELECT * FROM employee",
            index: 0,
            pick: function () {
                return exportArray[0];
            },
        },
        {
            choice: "View All Employees by Department",
            employeeTitle: "",
            role: [1, 2, 3],
            sqlScript: `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary FROM employee INNER JOIN roles ON (employee.role_id = roles.id) INNER JOIN department ON (roles.department_id = department.id) WHERE (roles.department_id = ${this.employeeTitle})`,
            index: 1,
            pick: async function (res) {
                await inquirer
                    .prompt({
                        message: "Pick Id number for department" + JSON.stringify(res, null, 2),
                        name: "pickDepartment"

                    }).then((data) => {
                        this.employeeTitle = JSON.parse(data.pickDepartment);
                        info = exportArray[1];
                    });
                return exportArray[1];
            }

        },
        {
            choice: "View All Roles",
            sqlScript: "SELECT roles.title, roles.salary, department.name  FROM roles INNER JOIN department ON (roles.department_id = department.id)",
            index: 2,
            pick: function () {
                return exportArray[2];
            }
        },
        {
            choice: "View All Departments",
            sqlScript: "SELECT * FROM department",
            index: 3,
            pick: function () {
                return exportArray[3];
            }
        },
        {
            choice: "Update Employee Role",
            sqlScript: "UPDATE employee SET ? WHERE ? AND ?",
            saveParam: [],
            role: [],
            index: 4,
            pick: async function (res) {
                let info;
                await inquirer
                    .prompt([
                        {
                            message: "Enter employee's first name",
                            name: "firstName"

                        },
                        {
                            message: "Enter employee's Last name",
                            name: "lastName"
                        },
                        {
                            message: "Choose role id " + JSON.stringify(res, null, 2),
                            name: "newRole"
                        }

                    ]).then((data) => {
                        this.saveParam = [{ role_id: data.newRole }, { first_name: data.firstName }, { last_name: data.lastName }]
                    });
                return exportArray[4];
            }
        },
        {
            choice: "Update Role?",
            sqlScript: "UPDATE roles SET ?, ? WHERE ?",
            saveParam: [],
            role: [],
            index: 5,
            pick: async function (res) {
                let info;
                await inquirer
                    .prompt([
                        {

                            message: "Which role do you wish to update, choose id " + JSON.stringify(res, null, 2),
                            name: "oldTitle",

                        },
                        {
                            message: "What is the new role title?",
                            name: "newTitle"
                        },
                        {
                            message: "What is the new role salary?",
                            name: "roleSalary"
                        },

                    ]).then((data) => {
                        data.roleSalary = JSON.parse(data.roleSalary);
                        data.oldTitle = JSON.parse(data.oldTitle);

                        this.saveParam = [{ title: data.newTitle }, { salary: data.roleSalary }, { id: data.oldTitle }];
                    });
                return exportArray[5];
            }
        }
    ];

module.exports = exportArray;


// let x = data.newTitle
// x.split("");
// for (let i = 0; i < x.length; i++) {
//     if (x[i] === "\"") {
//         x.splice(i, 1, "\'");
//     }
// }
// data.newTitle = x.join(",")
// data.roleSalary = JSON.parse(data.roleSalary);
// data.oldTitle = JSON.parse(data.oldTitle);
