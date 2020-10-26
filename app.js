var mysql = require("mysql")
var inquirer = require("inquirer")
var cTable = require("console.table");

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "SmotheredFear!45",
    database: "employeesdb"
})

connection.connect(function(err) {
    if(err) throw err
    else console.log("Connection id", connection.threadId)
    start()
})

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
async function start() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "View employee names", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name: "selection"
    }).then(function(userinput){
        console.log(userinput.selection)
        if(userinput.selection == "View all departments") {
            // show departments only
            viewDepartment();
            
        } else if (userinput.selection == "View all roles") {
            //show roles only
            viewRoles();
            
        } else if (userinput.selection == "View all employees") {
            //show employees only
            viewEmployees();
            
        } else if (userinput.selection == "View employee names") {
            //show employee names
            viewEmployeeNames();
            
        } else if (userinput.selection == "Add a department") {
            //add another department
            addDepartment();

        } else if (userinput.selection == "Add a role") {
            //add another role
            addRole();
            
        }  else if (userinput.selection == "Add an employee") {
            //add nanother employee
            addEmployee();
            
        } else if (userinput.selection == "Update an employee role") {
            //update an existing employee
            updateEmployee();
            
        }
    })
};

async function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

async function viewRoles() {
    let query = "SELECT title, role.id, department_id, salary, department.name FROM role, department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

async function viewEmployees() {
    let query = "SELECT employee.id, first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee, role, department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

async function viewEmployeeNames() {
    let query = "SELECT first_name, last_name FROM employee";

    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

async function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the new department?",
        name: "deptName"
    }).then(function(response){
        connection.query("INSERT INTO department (name) VALUES (?)", [response.deptName], function(err, res) {
            if (err) throw err;
            console.table(res)
            start();
        })
    })
}

async function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "roleName"
        },
        {
            type: "input", 
            message: "What is the salary for this role?",
            name: "salary"
        },
        {
            type: "inout",
            message: "What is the departments ID number?",
            name: "deptID"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.roleName, response.salary, response.deptID], function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    })
}

async function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Whats the first name of the employee?",
            name: "newEmpFN"
        },
        {
            type: "input",
            message: "Whats the last name of the employee?",
            name: "newEmpLN"
        },
        {
            type: "input",
            message: "What is the employees role ID number?",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is the employees managers ID number?",
            name: "managerID"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.newEmpFN, response.newEmpLN, response.roleID, response.managerID], function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    })
}

async function updateEmployee() {
    let employees = viewEmployeeNames();
    let roles = viewRoles();

    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "empUpdate",
            choices: [ employees ]
        },
        {
            type: "list",
            message: "What is the employees new role?",
            name: "updateRole",
            choices: [ roles ]
        }
    ]).then(function(response) {
            console.table(res);
            start();
        })
}