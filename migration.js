const sqlite3 = require('sqlite3').verbose();

// Create or open a SQLite database (it will be created if it doesn't exist)
const db = new sqlite3.Database('mydatabase.db');

// Create tables (if they don't exist)
db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(`
    CREATE TABLE IF NOT EXISTS appartment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS resident (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      FOREIGN KEY (apartment_id) REFERENCES appartment(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS feed (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INT NOT NULL,
      resident_id INT NOT NULL,
      message VARCHAR(255) NOT NULL,
      FOREIGN KEY (apartment_id) REFERENCES appartment(id),
      FOREIGN KEY (resident_id) REFERENCES resident(id)
    )
  `);

  // Insert data into the tables

  const appartmentStmt = db.prepare('INSERT INTO appartment (name) VALUES (?)'); // Prepare SQL to be executed later
  const residentStmt = db.prepare(
    'INSERT INTO resident (apartment_id, name) VALUES (?, ?)',
  );
  const feedStmt = db.prepare(
    'INSERT INTO feed (apartment_id, resident_id, message) VALUES (?, ?, ?)',
  );

  // Data to be inserted
  const appartmentData = [
    { name: 'apartment1' },
    { name: 'apartment2' },
    { name: 'apartment3' },
  ];

  const residentData = [
    { apartment_id: 1, name: 'user1' },
    { apartment_id: 2, name: 'user2' },
    { apartment_id: 3, name: 'user3' },
    { apartment_id: 1, name: 'user4' },
    { apartment_id: 2, name: 'user5' },
    { apartment_id: 3, name: 'user6' },
  ];

  const feedData = [
    { apartment_id: 1, resident_id: 1, message: 'message 1' },
    { apartment_id: 1, resident_id: 1, message: 'message 2' },
    { apartment_id: 1, resident_id: 2, message: 'message 3' },
    { apartment_id: 2, resident_id: 2, message: 'message 4' },
    { apartment_id: 2, resident_id: 3, message: 'message 5' },
    { apartment_id: 3, resident_id: 3, message: 'message 6' },
    { apartment_id: 3, resident_id: 1, message: 'message 7' },
  ];

  appartmentData.forEach((apartment) => {
    appartmentStmt.run(apartment.name);
  });

  appartmentStmt.finalize();
  
  residentData.forEach((resident) => {
    residentStmt.run(resident.apartment_id, resident.name);
  });

  residentStmt.finalize();

  feedData.forEach((feed) => {
    feedStmt.run(feed.apartment_id, feed.resident_id, feed.message);
  });

  feedStmt.finalize();

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Data inserted successfully.');
    }
  });
});
