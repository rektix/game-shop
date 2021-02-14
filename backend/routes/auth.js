const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bcryptSaltRounds = 10;

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    database: 'games'
});

const route = express.Router();

const sema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(60).required(),
    password: Joi.string().trim().min(4).max(60).required()
});

route.use(express.json());


route.post('/register', (req, res) => {
    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        query = 'select * from users where username=?';
        formated = mysql.format(query, [req.body.username]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else if (response.length)
                res.status(500).send({ msg: 'User with same username already exists.' });
            else {
                query = 'insert into users (username, password) values (?, ?)';
                bcrypt.hash(
                    req.body.password,
                    bcryptSaltRounds,
                    function(err, encryptedPassword) {
                        if (err)
                            res.status(500).send(err.sqlMessage);
                        formated = mysql.format(query, [req.body.username, encryptedPassword]);

                        pool.query(formated, (err, rows) => {
                            if (err) {
                                res.status(500).send(err.sqlMessage);
                            } else
                                res.send(rows[0]);
                        })
                    }
                );
            }
        })
    }
})

route.post('/login', (req, res) => {
    query = 'select * from users where username=?';
    formated = mysql.format(query, [req.body.username]);

    pool.query(formated, (err, response) => {
        // user does not exists
        if (err) {
            return res.status(400).send({
                msg: err
            });
        }
        if (!response.length) {
            return res.status(401).send({
                msg: 'Username or password is incorrect!'
            });
        }
        // check password
        bcrypt.compare(
            req.body.password,
            response[0]['password'],
            (bErr, bResult) => {
                // wrong password
                if (bErr) {
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
                if (bResult) {
                    const token = jwt.sign({
                            username: response[0].username,
                            userId: response[0].id
                        },
                        'SECRETKEY', {
                            expiresIn: '7d'
                        }
                    );
                    return res.status(200).send({
                        msg: 'Logged in!',
                        token,
                        user: response[0]
                    });
                }
                return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            }
        );
    });
});


module.exports = route;