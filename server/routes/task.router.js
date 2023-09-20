const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasklist" ORDER BY "id";';
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error getting tasks', error);
      res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
  let newTask = req.body;
  console.log('Adding task', newTask);

  let queryText = `INSERT INTO "tasklist" ("Task")
                   VALUES ($1);`;
  pool.query(queryText, [newTask.task])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Error adding new task', error);
      res.sendStatus(500);
    });
});


router.put('/:id/done', (req, res) => {
  let reqid = req.params.id;
  let sqlText = `UPDATE "tasklist" SET "Status" = true WHERE "id" = $1;`;
  pool.query(sqlText, [reqid])
    .then(result => {
      console.log('Task updated to done');
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Error updating task', error);
      res.sendStatus(500);
    });
});


router.delete('/:id', (req, res) => {
  let reqid = req.params.id;
  let sqlText = `DELETE FROM "tasklist" WHERE "id" = $1;`;
  pool.query(sqlText, [reqid])
    .then(result => {
      console.log('Task is now deleted');
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('Error deleting task', error);
      res.sendStatus(500);
    });
});

module.exports = router;