//requring the necessary modules
const inquirer = require('inquirer');
const pool = require('./db');

//async function to prompt the user with a list of options to choose from
const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Exit'
        ],
      },
    ]);

    //switch statement to determine which function to run based on the user's choice
    switch (choice) {
        case 'View All Departments':
          return viewAllDepartments();
        case 'View All Roles':
          return viewAllRoles();
        case 'View All Employees':
          return viewAllEmployees();
        case 'Add a Department':
          return addDepartment();
        case 'Add a Role':
          return addRole();
        case 'Add an Employee':
          return addEmployee();
        case 'Update an Employee Role':
          return updateEmployeeRole();
        default:
          return process.exit();
      }
    };

//using pool.query for ease of use on my brain rather than using a query.sql file to store all the queries

    //function to view all departments
    const viewAllDepartments = async () => {
        const res = await pool.query('SELECT * FROM department');
        console.table(res.rows);
        mainMenu();
      };

        //function to view all roles using a join statement to display the department name instead of the department id 
      const viewAllRoles = async () => {
        const res = await pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');
        console.table(res.rows);
        mainMenu();
      };

        //function to view all employees using a join statement to display the department name, role title, and manager name
      const viewAllEmployees = async () => {
        const res = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id');
        console.table(res.rows);
        mainMenu();
      };