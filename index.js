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

      //async function to add a department to the database  
      const addDepartment = async () => {
        const { name } = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
          },
        ]);

        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added ${name} to the database`);
  mainMenu();
};

//async function to add a role to the database using a list of department choices  
const addRole = async () => {
    const departments = await pool.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(department => ({
      name: department.name,
      value: department.id,
    }));

    const { title, salary, department_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role:',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for the role:',
          choices: departmentChoices,
        },
      ]);

      //inserting the role into the database with a title, salary, and department id 
      await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
      console.log(`Added ${title} to the database`);
      mainMenu();
    };

    //add an employee to the database using a list of role choices and manager choices that are pulled from the database 
    const addEmployee = async () => {
        const roles = await pool.query('SELECT * FROM role');
        const roleChoices = roles.rows.map(role => ({
          name: role.title,
          value: role.id,
        }));

        //pulling the employee table from the database to get the first name, last name, and id of the manager to display in the list of manager choices
        const employees = await pool.query('SELECT * FROM employee');
        const managerChoices = employees.rows.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
        managerChoices.push({ name: 'None', value: null });

        //prompting the user to enter the first name, last name, role, and manager for the employee
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'Enter the first name of the employee:',
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'Enter the last name of the employee:',
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Select the role for the employee:',
              choices: roleChoices,
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Select the manager for the employee:',
              choices: managerChoices,
            },
          ]);

            //inserting the employee into the database with the first name, last name, role id, and manager id
          await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log(`Added ${first_name} ${last_name} to the database`);
  mainMenu();
};

//update an employee's role using a list of employee choices and role choices
const updateEmployeeRole = async () => {
    const employees = await pool.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    const roles = await pool.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
      name: role.title,
      value: role.id,
    }));

    //prompting the user to select an employee and a new role for the employee
    const { employee_id, role_id } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee to update:',
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role for the employee:',
          choices: roleChoices,
        },
      ]);

        //updating the employee's role in the database
      await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log(`Updated employee's role`);
  mainMenu();
};

//starting the application
mainMenu();