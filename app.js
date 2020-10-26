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
        choices: ["View all departments", "View all roles", "View all employees", "View employee names", "View employee by manager", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
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

        } else if (userinput.selection == "View employee by manager") {
            //show employees by manager
            viewEmpByMgr()
            
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

// View all departments
async function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// View all roles
async function viewRoles() {
    let query = "SELECT title, id AS role_id, department_id, salary FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// View all employess + their info
async function viewEmployees() {
    // SELECT id, first_name, last_name, role.title, role.salary, department.name AS department, manager_id AS Manager FROM employee e LEFT JOIN employee m ON employee.manager_id = manager.id INNER JOIN role r ON employee.role_id = role.id INNER JOIN department d ON role.department_id = department.id
    // code above gave errors, saving until I can debug it.
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// View just employee names
async function viewEmployeeNames() {
    let query = "SELECT first_name, last_name FROM employee";

    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// View employees by manager
async function viewEmpByMgr() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the manager's ID that you would like to view.",
            name: "mgrView"
        }
    ]).then(function(response) {
        connection.query("SELECT first_name, last_name FROM employee WHERE manager_id=?", [response.mgrView], function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    })
}

// Add a department
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

// Add another role
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

// Add another employee
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

// Update a current employee
async function updateEmployee() {
    //let employees = viewEmployeeNames();
    //let roles = viewRoles();

    inquirer.prompt([
        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "empUpdate",
        },
        {
            type: "input",
            message: "What is the employees new role?",
            name: "updateRole",
        }
    ]).then(function(response) {
        connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [response.updateRole, response.empUpdate], function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    })
}