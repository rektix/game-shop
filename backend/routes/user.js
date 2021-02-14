const express = require('express');
const mysql = require('mysql');
const userMiddleware = require('../middleware/users.js')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    database: 'games'
});

const route = express.Router();

route.use(express.json());

route.get('/list', userMiddleware.isLoggedIn, (req, res, next) => {
    let query = 'SELECT purchase.id, games.id, games.name FROM games INNER JOIN purchase ON games.id=purchase.game_id WHERE purchase.user_id=?'
    let formated = mysql.format(query, [req.userData.userId]);
    console.log(formated)
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let data = { name: req.userData.username, games: rows }
            console.log(data)
            console.log(req.userData)
            res.send(data);
        }
    })
})

module.exports = route;