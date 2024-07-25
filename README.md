# Employee Tracker

Employee Tracker is a command-line application that allows business owners to manage their company's employee database. The application provides functionalities to view and manage departments, roles, and employees, enabling business owners to organize and plan their business effectively.

## Demo



https://github.com/user-attachments/assets/0e2c090f-fff1-4d5d-9377-d359ba64e9db



## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation
Clone the repository:
```sh
git clone https://github.com/ElijahWard4/employee-tracker.git
cd employee_tracker
```

Install the necessary packages:
```sh
npm install
```

Set up the PostgreSQL database:
1. Create a PostgreSQL database named `employee_tracker`.
2. In the db.js file enter your username, host, and password
```sh 
const pool = new Pool({
  user: 'YOUR USERNAME',
  host: 'ENTER HOST',
  database: 'employee_tracker',
  password: 'YOUR PASSWORD',
  port: 5432,
});
```
3. Initialize the database:
```sh
open the query tool on the employee_tracker database and execute the code from schema.sql/seeds.sql
```

Start the application:
```sh
node index.js
```

## Usage
Upon starting the application, you will be presented with a menu of options:
- View All Departments
- View All Roles
- View All Employees
- Add a Department
- Add a Role
- Add an Employee
- Update an Employee Role
- Exit

Navigate through the menu using the arrow keys and select an option by pressing Enter.

## Database Schema
The database schema consists of three tables: department, role, and employee.

**Department:**
- id: Primary key
- name: Name of the department

**Role:**
- id: Primary key
- title: Title of the role
- salary: Salary for the role
- department_id: Foreign key referencing department

**Employee:**
- id: Primary key
- first_name: Employee's first name
- last_name: Employee's last name
- role_id: Foreign key referencing role
- manager_id: Foreign key referencing another employee (self-referencing)

## Features
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

Feel free to contact me with any questions my email is 
elijah.ward014@gmail.com
Happy coding!!
