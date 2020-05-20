const inquirer = require("inquirer");
const colors = require("colors");

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
            deptID: '',
            sqlScript: '',
            index: 1,
            pick: async function (res) {
                console.table(res);
                await inquirer
                    .prompt({
                        message: "Pick Id number for department:",
                        name: "pickDepartment"

                    }).then((data) => {
                        this.deptID = data.pickDepartment;
                        this.sqlScript = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary FROM employee INNER JOIN roles ON (employee.role_id = roles.id) INNER JOIN department ON (roles.department_id = department.id) WHERE (roles.department_id = ${this.deptID})`;
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
            index: 4,
            pick: async function (res) {
                console.table(res);
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
                            message: "Choose role id:",
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
            sqlScript: "UPDATE roles SET ?, ?, ? WHERE ?",
            saveParam: [],
            index: 5,
            pick: async function (res,rows) {
                console.table(rows);
                console.table(res);
                await inquirer
                    .prompt([
                        {

                            message: "Which role do you wish to update, choose id:",
                            name: "roleID",

                        },
                        {
                            message: "What is the new role title?",
                            name: "roleTitle"
                        },
                        {
                            message: "What is the new role salary?",
                            name: "roleSalary"
                        },
                        {
                            message: "What deparment?",
                            name: "roleDept"
                        }

                    ]).then((data) => {
                        data.roleSalary = JSON.parse(data.roleSalary);
                        data.roleID = JSON.parse(data.roleID);
                        data.roleDept = JSON.parse(data.roleDept);

                        this.saveParam = [{ title: data.roleTitle },{ salary: data.roleSalary },{ department_id: data.roleDept}, { id: data.roleID }];
                    });
                return exportArray[5];
            }
        },
        {
            choice: "Add Role",
            sqlScript: "",
            saveParam: [],
            index: 6,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter role title",
                            name: "roleTitle"
                        },
                        {
                            message: "Enter role salary",
                            name: "roleSalary"
                        },
                        {
                            message: "Pick department ID:",
                            name: "roleDeptID"
                        }
                    ])
                    .then((data) => {
                        let x = data.roleID;
                        let y = data.roleTitle;
                        let z = data.roleSalary;
                        let w = data.roleDeptID;
                        this.sqlScript =  `INSERT INTO roles (title, salary, department_id) VALUES (\'${data.roleTitle}\', ${data.roleSalary}, ${data.roleDeptID});`
                        this.saveParam = [y,z,w];
                        console.log(this.saveParam);
                    });
                    return exportArray[6];
            }
        },
        {
            choice: "Add Employee",
            sqlScript: "",
            saveParam: [],
            index: 7,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter employee first name",
                            name: "employeeFirst"
                        },
                        {
                            message: "Enter employee last name",
                            name: "employeeLast"
                        },
                        {
                            message: "Enter employee role ID:",
                            name: "roleDeptID"
                        }
                    ])
                    .then((data) => {
                        this.sqlScript =  `INSERT INTO employee (first_name, last_name, role_id) VALUES (\'${data.employeeFirst}\', \'${data.employeeLast}\', ${data.roleDeptID});`
                        this.saveParam = [data.employeeFirst,data.employeeLast,data.roleDeptID];
                    });
                    return exportArray[7];
            }
        },
        {
            choice: "Add Department",
            sqlScript: "",
            saveParam: [],
            index: 8,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter Department Name",
                            name: "deptName"
                        }
                    ])
                    .then((data) => {
                        this.sqlScript =  `INSERT INTO department (name) VALUES (\'${data.deptName}\');`
                        this.saveParam = [data.deptName];
                        console.log(this.saveParam);
                    });
                    return exportArray[8];
            }
        },
        {
            choice: "Remove Employee",
            sqlScript: "",
            saveParam: [],
            index: 9,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter Employee ID:",
                            name: "employeeID"
                        }
                    ])
                    .then((data) => {
                        this.sqlScript =  `DELETE FROM employee WHERE ?;`;
                        data.employeeID = JSON.parse(data.employeeID);
                        this.saveParam = [{id: data.employeeID}];
                    });
                    return exportArray[9];
            }
        },
        {
            choice: "Remove Role",
            sqlScript: "",
            saveParam: [],
            index: 10,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter Role ID:",
                            name: "roleID"
                        }
                    ])
                    .then((data) => {
                        this.sqlScript =  `DELETE FROM roles WHERE ?;`;
                        data.roleID = JSON.parse(data.roleID);
                        this.saveParam = [{id: data.roleID}];
                    });
                    return exportArray[10];
            }
        },
        {
            choice: "Remove Department",
            sqlScript: "",
            saveParam: [],
            index: 11,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter Deptmartment ID:",
                            name: "deptID"
                        }
                    ])
                    .then((data) => {
                        this.sqlScript =  `DELETE FROM department WHERE ?;`;
                        data.deptID = JSON.parse(data.deptID);
                        this.saveParam = [{id: data.deptID}];
                    });
                    return exportArray[11];
            }
        },
        {
            choice: "Total Utilized Budget by Department",
            sqlScript: "",
            saveParam: [],
            index: 12,
            pick: async function (res) {
                console.table(res);
               await  inquirer
                    .prompt([
                        {
                            message: "Enter Deptmartment ID:",
                            name: "deptID"
                        }
                    ])
                    .then((data) => {
                        data.deptID = JSON.parse(data.deptID);
                        this.sqlScript =  `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name FROM employee INNER JOIN roles ON (employee.role_id = roles.id) INNER JOIN department ON (roles.department_id = department.id) WHERE department.id = ${data.deptID}`;
                        this.saveParam = [{id: data.deptID}];
                    });
                    return exportArray[12];
            }
        },
        {
            choice: "Exit"

        }
    ];

module.exports = exportArray;



