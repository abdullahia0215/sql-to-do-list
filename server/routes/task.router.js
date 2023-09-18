const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all books
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasklist" ORDER BY "id";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting tasks', error);
    res.sendStatus(500);
  });
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  let queryText = `INSERT INTO "tasklist" ("Task", "Status")
                   VALUES ($1, $2);`;
  pool.query(queryText, [newTask.task, newTask.status])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status

router.put('/:id/done', (req, res) => {
  let reqid = req.params.id;
  let sqlText = `UPDATE "Task" SET "Status" = true WHERE "id" = $1;`;
  pool.query(sqlText, [reqid])
    .then(result => {
      console.log('Task updated to done');
      res.sendStatus(201);
    }).catch(error => {
      console.log('error updating task', error);
      res.sendStatus(500);
    });
});


// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id

router.delete('/:id', (req, res) => {
  let reqid = req.params.id;
  let sqlText = `DELETE FROM "tasklist" WHERE "id" = $1;`;
  pool.query(sqlText, [reqid])
    .then(result => {
      console.log('task is now deleted')
      res.sendStatus(201);
    }).catch(error => {
      console.log ('error deleting task', error);
      res.sendStatus(500);
    })
})


module.exports = router;