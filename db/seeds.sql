INSERT INTO departments (name)
VALUES ("Ski Patrol"), ("Lift Operations"), ("Food And Beverage"), ("Retail");

INSERT INTO
    roles (title, salary, department_id)
VALUES ("Patroller", 30000, 1), ("Lift Operator", 20000, 2), ("Cook", 22000, 3), ("Cashier", 18000, 4);

INSERT INTO
    employees (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ("Dirk", "Nowitski", 2, 1), ("Zion", "Williamson", 1, 1), ("Geno", "Smith", 3, 1), ("Christian", "McCaffrey", 4, 1), ("Austin", "Ekeler", 1, 1);