require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");

async function restartDb() {
  try {
    const pool = getPool();

    await pool.query(`DROP DATABASE IF EXISTS apiculture;`);
    await pool.query(`CREATE DATABASE IF NOT EXISTS apiculture;`);
    await pool.query(`USE apiculture;`);

    await pool.query(`DROP TABLE IF EXISTS users;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            userEmail VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
            userPassword VARCHAR(100) NOT NULL,
            created DATETIME DEFAULT CURRENT_TIMESTAMP
        );  
    `);

    await pool.query(`DROP TABLE IF EXISTS suppliers;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS suppliers (
            supplierId INT AUTO_INCREMENT PRIMARY KEY,
            supplierName VARCHAR(100) NOT NULL,
            phone VARCHAR(15),
            email VARCHAR(100),
            web VARCHAR(100),
            locality VARCHAR(100),
            street VARCHAR(100),
            addressNumber INT,
            notes VARCHAR(500),
            userEmail VARCHAR(100),
            FOREIGN KEY (userEmail) REFERENCES users(userEmail) ON DELETE CASCADE,
	        created DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await pool.query(`DROP TABLE IF EXISTS clients;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS clients (
            clientId INT AUTO_INCREMENT PRIMARY KEY,
            clientName VARCHAR(100) NOT NULL,
            requiredServices ENUM('Products', 'Polinization'),
            phone VARCHAR(15),
            email VARCHAR(100),
            locality VARCHAR(100),
            street VARCHAR(100),
            addressNumber INT,
            notes VARCHAR(500),
            userEmail VARCHAR(100),
            FOREIGN KEY (userEmail) REFERENCES users(userEmail) ON DELETE CASCADE,
	        created DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await pool.query(`DROP TABLE IF EXISTS apiaries;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS apiaries (
            apiaryId INT AUTO_INCREMENT PRIMARY KEY,
            apiaryName VARCHAR(50),
            locality VARCHAR(100) NOT NULL,
            latitude DECIMAL(10, 8) NOT NULL,
            longitude DECIMAL(10, 8) NOT NULL,
            nomad BOOLEAN NOT NULL DEFAULT FALSE,
            vegetation VARCHAR(50) NOT NULL DEFAULT 'flores silvestres',
            hmToWater TINYINT NOT NULL,-- hectometros de distancia hasta fuente de agua
            startDate DATE NOT NULL,
            endDate DATE,
            userIsOwner BOOLEAN NOT NULL DEFAULT TRUE,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            userEmail VARCHAR(100),
            clientId INT DEFAULT NULL,
            FOREIGN KEY (userEmail) REFERENCES users(userEmail) ON DELETE CASCADE,
            FOREIGN KEY (clientId) REFERENCES clients(clientId) ON DELETE set null
        );
    `);

    await pool.query(`DROP TABLE IF EXISTS queens;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS queens (
            queenId INT AUTO_INCREMENT PRIMARY KEY,
            queenName VARCHAR(50),
            yearOfBirth YEAR NOT NULL,
            yearOfDeath YEAR,
            origin ENUM('captured', 'bred', 'bought') NOT NULL DEFAULT 'bought',
            userEmail VARCHAR(100),
            mother INT,
            supplierId INT,
            FOREIGN KEY (userEmail) REFERENCES users(userEmail) ON DELETE CASCADE,
            FOREIGN KEY (mother) REFERENCES queens(queenId) ON DELETE set null,
            FOREIGN KEY (supplierId) REFERENCES suppliers(supplierId) ON DELETE set null,
            created DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);

    await pool.query(`DROP TABLE IF EXISTS beehives;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS beehives (
            beehiveId INT AUTO_INCREMENT PRIMARY KEY,
            beehiveType ENUM('Langstroth', 'Warré', 'WBC', 'Horizontal') NOT NULL DEFAULT 'Langstroth',
            numFrames TINYINT UNSIGNED NOT NULL,
            numSuperChambers TINYINT UNSIGNED NOT NULL,
            numBroodChambers TINYINT UNSIGNED NOT NULL DEFAULT 1,
            queenExcluder BOOLEAN DEFAULT TRUE,
            screenedBottom BOOLEAN DEFAULT TRUE,
            slattedRack BOOLEAN DEFAULT FALSE,
            landingBoard BOOLEAN DEFAULT FALSE,
            entranceReducer BOOLEAN DEFAULT FALSE,
            pollenTrap BOOLEAN DEFAULT FALSE,
            queenId INT,
            apiaryId INT,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (queenId) REFERENCES queens(queenId) ON DELETE set null,
            FOREIGN KEY (apiaryId) REFERENCES apiaries(apiaryId) ON DELETE set null
        );
    `);

    await pool.query(`DROP TABLE IF EXISTS harvests;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS harvests (
	        -- atributos historicos que deben quedar ligados al estado de la colmena y apiario en el momento de la cosecha, y no reflejar cambios posteriores
            harvestId INT AUTO_INCREMENT PRIMARY KEY,
            harvestDate DATE NOT NULL DEFAULT (curdate()),
            kgHoney TINYINT UNSIGNED NOT NULL,
            kgPollen TINYINT UNSIGNED NOT NULL DEFAULT 0,
            beehiveId INT NOT NULL,
            numFrames TINYINT UNSIGNED,
            numSuperChambers TINYINT UNSIGNED,
            numBroodChambers TINYINT UNSIGNED DEFAULT 1,
            queenExcluder BOOLEAN,
            screenedBottom BOOLEAN,
            slattedRack BOOLEAN,
            landingBoard BOOLEAN,
            entranceReducer BOOLEAN,
            pollenTrap BOOLEAN,
            queenId INT NOT NULL,
            apiaryId INT NOT NULL,
            apiaryName VARCHAR(50),
            locality VARCHAR(100),
            latitude DECIMAL(10, 8),
            longitude DECIMAL(10, 8),
            nomad BOOLEAN,
            vegetation VARCHAR(50) DEFAULT 'flores silvestres',
            hmToWater TINYINT,
            clientId INT DEFAULT NULL,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            userEmail VARCHAR(100) NOT NULL,
            FOREIGN KEY (userEmail) REFERENCES users(userEmail) on delete cascade
        );
    `);

    await pool.query(`
        INSERT INTO users
            (userEmail, userPassword)
        VALUES
            ('abejamaya@email.com', '${await bcrypt.hash("abejamaya", 10)}'),
            ('sherlock@email.com', '${await bcrypt.hash("sherlock", 10)}');
    `);

    await pool.query(`
        INSERT INTO suppliers
            (supplierName, phone, email, web, locality, street, addressNumber, userEmail) 
        VALUES
            ('proveedorTest', '123456789', 'proveedorTest@example.com', 'www.proveedorTest.com', 'Villa Bicho', 'Avenida de los Himenópteros', 1, 'abejamaya@email.com');
    `);

    await pool.query(`
        INSERT INTO clients
            (clientName, phone, email, locality, street, addressNumber, userEmail) 
        VALUES
            ('clienteTest', '987654321', 'clienteTest@example.com', 'Arroyo de la Miel', 'Calle Polen', 2, 'abejamaya@email.com');
    `);

    await pool.query(`
        INSERT INTO apiaries
            (apiaryName, locality, latitude, longitude, nomad, userIsOwner, vegetation,  hmToWater,	startDate, userEmail, clientId) 
        VALUES
            ('apiarioTest', 'localityTest', 40.123456, -3.123456, FALSE, TRUE, 'flores silvestres', 0, '2020-01-01', 'abejamaya@email.com', null),
            ('apiarioNomadaTest', 'localityTest', 40.654321, -3.654321, TRUE, FALSE, 'naranjos', 1, '2021-01-01', 'abejamaya@email.com', 1);
    `);

    await pool.query(`
        INSERT INTO queens
            (queenName, yearOfBirth, yearOfDeath, origin, userEmail, mother, supplierId) 
        VALUES
            ('reina1', 2020, NULL, 'bought', 'abejamaya@email.com', NULL,1),
            ('reina2', 2021, NULL, 'bought', 'abejamaya@email.com', NULL, 1),
            ('reinaHijaDeReina1', 2022, NULL, 'bred', 'abejamaya@email.com', 1, 1),
            ('reinaNómada', 2021, NULL, 'bought', 'abejamaya@email.com', NULL,1);    
    `);

    await pool.query(`
        INSERT INTO beehives
            (beehiveType, numFrames, numSuperChambers, queenId, apiaryId) 
        VALUES
            ('Langstroth', 10, 2, 1, 1),
            ('Warré', 8, 1, 2, 1),
            ('Horizontal', 12, 3, 3, 1),
            ('Langstroth', 10, 2, 4, 2);
    `);

    await pool.query(`
        INSERT INTO harvests
            (harvestDate, kgHoney, kgPollen, queenId, apiaryId, beehiveId, numFrames, numSuperChambers, vegetation, userEmail) 
        VALUES
            ('2020-01-01', 10, 2, 1, 1, 1, 12, 2, "flores silvestres", 'abejamaya@email.com'),
            ('2021-01-01', 15, 3, 1, 1, 1, 12, 2, "flores silvestres", 'abejamaya@email.com'),
            ('2022-01-01', 20, 4, 1, 1, 1, 12, 2, "flores silvestres", 'abejamaya@email.com'),
            ('2023-01-01', 12, 2, 1, 1, 1, 12, 2, "flores silvestres", 'abejamaya@email.com'),
            ('2024-01-01', 18, 3, 1, 1, 1, 12, 2, "flores silvestres", 'abejamaya@email.com'),
            ('2021-01-01', 49, 1, 4, 2, 4, 18, 1, "castaños", 'abejamaya@email.com'),
            ('2022-01-01', 48, 0, 4, 2, 4, 18, 1, "naranjos", 'abejamaya@email.com');
    `);
    console.log("Database apiculture reset to original status;");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
}

restartDb();
