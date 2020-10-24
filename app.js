var mysql = require("mysql")
var inquirer = require("inquirer")
 

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
function start() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name: "selection"
    }).then(function(userinput){
        console.log(userinput.selection)
        if(userinput.selection == "View all departments") {
            // show departments only
            viewDepartment();
            break;
        } else if (userinput.selection == "View all roles") {
            //show roles only
            viewRole();
            break;
        } else if (userinput.selection == "View all employees") {
            //show employees only
            viewEmployees();
            break;
        } else if (userinput.selection == "Add a department") {
            //add another department
            addDepartment();
            break;
        } else if (userinput.selection == "Add a role") {
            //add another role
            addRole();
            break;
        } else if (userinput.selection == "Add an employee") {
            //add nanother employee
            addEmployee();
            break;
        } else if (userinput.selection == "Update an employee role") {
            //update an existing employee
            updateEmployee();
            break;
        }
    })
};

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the new department?",
        name: "deptName"
    }).then(function(response){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function(err, res) {
            if (err) throw err;
            console.table(res)
            start();
        })
    })
}

function addRole() {
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
