INSERT INTO departments (name)
VALUES ("Ski Patrol"), ("Lift Operations"), ("Food And Beverage"), ("Retail");

INSERT INTO
    roles (
        id,
        title,
        salary,
        department_id
    )
VALUES ("Patroller", 30000), ("Lift Operator", 20000), ("Cook", 22000), ("Cashier", 18000);

INSERT INTO
    employees (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ("Lebron", "James"), ("Dirk", "Nowitski"), ("Zion", "Williamson"), ("Geno", "Smith"), ("Christian", "McCaffrey"), ("Austin", "Ekeler");