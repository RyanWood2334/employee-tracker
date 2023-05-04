const { table } = require("console");
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
//MAKE VARIABLES FOR YOUR SQL STRINGS
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
      let newDepartment = ans.deptName;
      db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        newDepartment,
        (err, res) => {
          if (err) {
            throw err;
          }
          console.log("department added!!");
          init();
        }
      );
    });
};
//  -name of dept
//MAKE VARIABLES FOR YOUR SQL STRINGS
//add a role
const addRole = () => {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;

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
          type: "list",
          name: "roleDepartment",
          message:
            "Which department id does the role you would like to add belong to?",
          choices: res.map((res) => res.id + " " + "(" + res.name + ")"),
        },
      ])
      .then((ans) => {
        let newRole = [];
        let roleName = ans.roleName;
        let roleSalary = ans.roleSalary;
        let roleDepartment = ans.roleDepartment.split(" ")[0];
        newRole.push(roleName, roleSalary, roleDepartment);
        console.log(roleName);
        console.log(roleSalary);
        console.log(roleDepartment);
        console.log(newRole);
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES (?)`,
          [newRole],
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log("role added!!");
            init();
          }
        );
      });
  });
};
//  -name
//  -salary
//  -department for role
//MAKE VARIABLES FOR YOUR SQL STRINGS
//add an employee
const addEmployee = () => {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;

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
          type: "list",
          name: "employeeRole",
          message: "What is their role?",
          choices: res.map((res) => res.id + " " + "(" + res.title + ")"),
        },
      ])
      .then((ans) => {
        console.log(ans);
        let newEmployee = [];
        let employeeFirstName = ans.firstName;
        let employeeLastName = ans.lastName;
        let employeeRole = ans.employeeRole.split(" ")[0];
        newEmployee.push(employeeFirstName, employeeLastName, employeeRole);
        console.log(employeeFirstName);
        console.log(employeeLastName);
        console.log(employeeRole);
        console.log(newEmployee);

        db.query("SELECT * FROM employees", function (err, res) {
          if (err) throw err;

          inquirer
            .prompt([
              {
                type: "list",
                name: "employeeManager",
                message: "What is their Manager's ID number?",
                choices: res.map(
                  (res) =>
                    res.id +
                    " " +
                    "(" +
                    res.first_name +
                    " " +
                    res.last_name +
                    ")"
                ),
              },
            ])
            .then((ans) => {
              let employeeManager = ans.employeeManager.split(" ")[0];
              newEmployee.push(employeeManager);
              db.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)`,
                [newEmployee],
                (err, results) => {
                  if (err) {
                    throw err;
                  }
                  console.log("employee added!!");
                  init();
                }
              );
            });
        });
      });
  });
};

//  -first name
//  -last name
//  -role
//  -manager

//update an employee role
const updateRole = () => {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeList",
          message: "Which employee's role would you like to update?",
          choices: res.map(
            (res) =>
              res.id + " " + "(" + res.first_name + " " + res.last_name + ")"
          ),
        },
      ])
      .then((ans) => {
        let employeeToUpdate = ans.employeeList.split(" ")[0];
        console.log(employeeToUpdate);

        db.query("SELECT * FROM roles", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "roleList",
                message: "What is this employee's new role?",
                choices: res.map((res) => res.id + " " + "(" + res.title + ")"),
              },
            ])
            .then((ans) => {
              console.log(ans);
              let roleChosen = ans.roleList.split(" ")[0];
              db.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [roleChosen, employeeToUpdate],
                function (err, res) {
                  if (err) throw err;
                  console.log("employee role updated!");
                  init();
                }
              );
            });
        });
      });
  });
};
//  -new role
//
init();
