require("dotenv").config();

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
            userId INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
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
            userId INT,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
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
            userId INT,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
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
            vegetation VARCHAR(50) NOT NULL,
            hmToWater TINYINT NOT NULL,-- hectometros de distancia hasta fuente de agua
            startDate DATE NOT NULL,
            endDate DATE,
            userIsOwner BOOLEAN NOT NULL DEFAULT TRUE,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            userId INT,
            clientId INT DEFAULT NULL,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
            FOREIGN KEY (clientId) REFERENCES clients(clientId) ON DELETE CASCADE,
            CHECK (userIsOwner = FALSE OR clientId IS NULL),
            CHECK (userIsOwner = TRUE OR clientId IS NOT NULL)
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
            userId INT,
            mother INT,
            supplierId INT,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
            FOREIGN KEY (mother) REFERENCES queens(queenId) ON DELETE CASCADE,
            FOREIGN KEY (supplierId) REFERENCES suppliers(supplierId) ON DELETE CASCADE,
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
            queenId INT NOT NULL,
            apiaryId INT NOT NULL,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (queenId) REFERENCES queens(queenId) ON DELETE CASCADE,
            FOREIGN KEY (apiaryId) REFERENCES apiaries(apiaryId) ON DELETE CASCADE
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
            numBroodChambers TINYINT UNSIGNED,
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
            vegetation VARCHAR(50) NOT NULL,
            hmToWater TINYINT,
            clientId INT DEFAULT NULL,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (beehiveId) REFERENCES beehives(beehiveId)
        );
    `);

    await pool.query(`
        INSERT INTO users
            (email, password)
        VALUES
            ('abejamaya@email.com', '${await bcrypt.hash("abejamaya", 10)}'),
            ('sherlock@email.com', '${await bcrypt.hash("sherlock", 10)}');
    `);

    await pool.query(`
        INSERT INTO suppliers
            (supplierName, phone, email, web, locality, street, addressNumber, userEmail) 
        VALUES
            ('proveedorTest', '123456789', 'proveedorTest@example.com', 'www.proveedorTest.com', 'Villa Bicho', 'Avenida de los Himenópteros', 1, 'maya@email.com');
    `);

    await pool.query(`
        INSERT INTO clients
            (clientName, phone, email, locality, street, addressNumber, userEmail) 
        VALUES
            ('clienteTest', '987654321', 'clienteTest@example.com', 'Arroyo de la Miel', 'Calle Polen', 2, 'maya@email.com');
    `);
    
    await pool.query(`
        INSERT INTO apiaries
            (apiaryName, locality, latitude, longitude, nomad, userIsOwner, vegetation,  hmToWater,	startDate, userEmail, clientId) 
        VALUES
            ('apiarioTest', 'localityTest', 40.123456, -3.123456, FALSE, TRUE, 'flores silvestres', 0, '2020-01-01', 'maya@email.com', null),
            ('apiarioNomadaTest', 'localityTest', 40.654321, -3.654321, TRUE, FALSE, 'naranjos', 1, '2021-01-01', 'maya@email.com', 1);
    `);

    await pool.query(`
        INSERT INTO queens
            (queenName, yearOfBirth, yearOfDeath, origin, supplierId) 
        VALUES
            ('reina1', 2020, NULL, 'bought', 1),
            ('reina2', 2021, NULL, 'bought', 1),
            ('reinaHijaDeReina1', 2022, NULL, 'bred', 1),
            ('reinaNómada', 2021, NULL, 'bought', 1);    
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
            (harvestDate, kgHoney, kgPollen, queenId, apiaryId, beehiveId, numFrames, numSuperChambers, vegetation) 
        VALUES
            ('2020-01-01', 10, 2, 1, 1, 1, 12, 2, "flores silvestres"),
            ('2021-01-01', 15, 3, 1, 1, 1, 12, 2, "flores silvestres"),
            ('2022-01-01', 20, 4, 1, 1, 1, 12, 2, "flores silvestres"),
            ('2023-01-01', 12, 2, 1, 1, 1, 12, 2, "flores silvestres"),
            ('2024-01-01', 18, 3, 1, 1, 1, 12, 2, "flores silvestres"),
            ('2021-01-01', 9, 1, 4, 2, 4, 8, 1, "castaños"),
            ('2022-01-01', 8, 0, 4, 2, 4, 8, 1, "naranjos");
    `);

  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
}

restartDb();
