const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');
const userMiddleware = require('../middleware/users.js')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    database: 'games'
});

const route = express.Router();

const sema = Joi.object().keys({
    name: Joi.string().trim().max(60).required(),
    genre: Joi.string().max(60).required(),
    score: Joi.number().min(1).max(10).required(),
    description: Joi.string().trim().required(),
    price: Joi.number().required()
});

route.use(express.json());

route.get('/games', userMiddleware.isLoggedIn, (req, res, next) => {
    pool.query('select * from games', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.post('/games', userMiddleware.isLoggedIn, (req, res, next) => {
    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "insert into games (name, genre, score, description, price) values (?, ?, ?, ?, ?)";
        let formated = mysql.format(query, [req.body.name, req.body.genre, req.body.score, req.body.description, req.body.price]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from games where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.get('/games/:id', userMiddleware.isLoggedIn, (req, res, next) => {
    let query = 'select * from games where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
});

route.put('/games/:id', userMiddleware.isLoggedIn, (req, res, next) => {
    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update games set name=?, genre=?, score=?, description=?, price=? where id=?";
        let formated = mysql.format(query, [req.body.name, req.body.genre, req.body.score, req.body.description, req.body.price, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from games where id=?';
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }

});

route.post('/games/buy/:id', userMiddleware.isLoggedIn, (req, res, next) => {
    let query = 'select * from games where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        if (!rows.length)
            res.status(500).send('Game does not exist.');
        query = 'insert into purchase (game_id, user_id, date) values (?, ?, NOW())';
        formated = mysql.format(query, [req.params.id, req.userData.userId]);

        pool.query(formated, (err, rows) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else
                res.send(rows[0]);
        });
    });
});

route.delete('/games/:id', userMiddleware.isAdmin, (req, res, next) => {
    let query = 'select * from games where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let game = rows[0];

            let query = 'delete from games where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(game);
            });
        }
    });
});

module.exports = route;