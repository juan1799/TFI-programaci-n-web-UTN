const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); 
const qs = require('querystring');
require('./config/setupModel');

const studentsRoutes = require('./routes/studentsRoutes');

const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('query parser', str => qs.parse(str));


app.use('/api/students', studentsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error en el servidor',
        error: err.message
    });
});

module.exports = app;
