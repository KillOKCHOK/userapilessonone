var express = require('express');
var router = express.Router();
var db = require("../db_connection/db");
/* GET users listing. SELECT * from applications.application */
router.get('/', function(req, res, next) {
  db.query('SELECT * from applications.application', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

router.post('/', function(req, res, next) {
  const { firstname, lastname,phone,email,msg} = req.body
  db.query('INSERT INTO applications.application ( firstName, lastName, phone, email, msg) VALUES($1,$2,$3,$4,$5) RETURNING id',[firstname, lastname,phone,email,msg], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Application added with ID: ${JSON.stringify(results.rows[0].id)}`);
  })
});

router.put('/', function(req, res, next) {
  const {id, firstname, lastname,phone,email,msg} = req.body
  db.query("UPDATE applications.application SET firstName=$1, lastName=$2, phone=$3, email=$4, msg=$5 WHERE id=$6",[firstname, lastname,phone,email,msg,id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Application updated with ID: ${id}`);
  })
});

router.delete('/:id', function(req, res, next) {
  const {id} = req.params
  db.query("DELETE FROM applications.application WHERE id=$1",[id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Deleted application with ID: ${id}`);
  })
});

module.exports = router;
