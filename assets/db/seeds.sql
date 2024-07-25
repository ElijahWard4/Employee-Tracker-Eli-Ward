-- Add departments
INSERT INTO department (name) VALUES ('Engineering'), ('Finance');

-- Add roles
INSERT INTO role (title, salary, department_id) VALUES 
  ('Software Engineer', 80000, 1),
  ('Accountant', 55000, 2);

-- Add employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  