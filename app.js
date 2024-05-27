const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes')
const todoRouter = require('./routes/todoRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authController = require('./controllers/authController')
const app = express();
app.use(express.json({
    limit: '10kb'
}))

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'A simple Express User Management API',
        },
    },
    apis: ['./swagger.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan('dev'));


app.use('/api/v1/users', userRouter)
app.use('/api/v1/todos', todoRouter)
app.use('/api/v1/login', authController.login)
app.use('/api/v1/logout', authController.logout)
module.exports = app;