const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to SQLite database file
const db = new sqlite3.Database('./recipes.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create table for recipes if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      instructions TEXT NOT NULL
    )
  `);
});

// API to get all recipes
app.get('/api/recipes', (req, res) => {
  db.all('SELECT * FROM recipes', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ recipes: rows });
  });
});

// API to add a new recipe
app.post('/api/recipes', (req, res) => {
  const { name, instructions } = req.body;
  db.run('INSERT INTO recipes (name, instructions) VALUES (?, ?)', [name, instructions], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// API to update a recipe
app.put('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { name, instructions } = req.body;
  db.run('UPDATE recipes SET name = ?, instructions = ? WHERE id = ?', [name, instructions, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// API to delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM recipes WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
