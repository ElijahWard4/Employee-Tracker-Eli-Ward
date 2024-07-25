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

