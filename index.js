const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
//build inquirer questions:
//  -view all departments
//  -view all employees
//  -view all roles
//  -add a department
//  -add a role
//  -add an employee
//  -update an employee role
//  -quit
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "init",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((ans) => {
      console.log(ans.init);
      //need a function to close recursion
      switch (ans.init) {
        case "View all departments":
          console.log("showing all departments!");
          viewDepartments();
          break;
        case "View all roles":
          console.log("showing all roles!");
          viewRoles();
          break;
        case "View all employees":
          console.log("showing all employees!");
          viewEmployees();
          break;
        case "Add a department":
          console.log("adding department...");
          addDepartment();
          break;
        case "Add a role":
          console.log("adding role...");
          addRole();
          break;
        case "Add an employee":
          console.log("adding employee...");
          addEmployee();
          break;
        case "Update an employee role":
          console.log("updating employee role...");
          updateRole();
          break;
        case "Quit":
          console.log("Bye-Bye!");
          return;
          break;

        default:
          console.log("something is broken");
      }
    });
};

//add recursive functions for inquirer
//view departments function
const viewDepartments = () => {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      return "something went wrong";
    } else {
      console.table(results);
      console.log("you chose to view all departments!");
      init();
    }
  });
};
//  name/id's

//view role function
const viewRoles = () => {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      return "something went wrong";
    } else {
      console.table(results);
      init();
      console.log("you chose to view all Roles!");
    }
  });
};
//  -job title
//  -role id
//  -dept role belongs to
//  -salary

//view all employees function
const viewEmployees = () => {
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) {
      return "something went wrong";
    } else {
      console.table(results);
      console.log("you chose to view all Employees!");
      init();
    }
  });
};
//  employee id's
//  employee first names
//  employee last names
//  employee job titles
//  employee departments
//  employee salaries
//  employee managers that they report to

//add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the Department you would like to add?",
      },
    ])
    .then((ans) => {
      console.log(ans);
      init();
    });
};
//  -name of dept

//add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role you would like to add?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role you would like to add?",
      },
      {
        type: "input",
        name: "roleDepartment",
        message:
          "Which department does the role you would like to add belong to?",
      },
    ])
    .then((ans) => {
      console.log(ans);
      init();
    });
};
//  -name
//  -salary
//  -department for role

//add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message:
          "What is the first Name of the Employee you would like to add?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is their last Name?",
      },
      {
        type: "input",
        name: "employeeRole",
        message: "What is their role?",
      },
      {
        type: "input",
        name: "employeeManager",
        message: "Who is their Manager?",
      },
    ])
    .then((ans) => {
      console.log(ans);
      init();
    });
};
//  -first name
//  -last name
//  -role
//  -manager

//update an employee role
const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeList",
        message: "Which employee's role would you like to update?",
      },
    ])
    .then((ans) => {
      console.log(ans);
      init();
    });
};
//  -new role
//
init();
