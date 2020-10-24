use employeesdb;

insert into department (name) values ("Sales"), ("Engineering"), ("Finance"), ("Legal");
insert into role (title, salary, department_id) values ("Sales Lead", 100000, 1),
 ("Salesperson", 80000, 1),
 ("Lead Engineer", 150000, 2), 
 ("Software Engineer", 120000, 2), 
 ("Accountant", 125000, 3), 
 ("Legal Team Lead", 250000, 4),
 ("Lawyer", 190000, 4),
 ("Software Engineer", 120000, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("John", "Doe", 1, null),
("Mike", "Chan", 2, null),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, null),
("Malia", "Brown", 5, null),
("Sarah", "Lourd", 6, null),
("Tom", "Allen", 7, null),
("Tamner", "Galal", 8, null);

update employee set manager_id = 6 where id = 7;
update employee set manager_id = 5 where id = 8;
update employee set manager_id = 3 where id = 4;
update employee set manager_id = 1 where id = 2;
update employee set manager_id = 3 where id = 1;