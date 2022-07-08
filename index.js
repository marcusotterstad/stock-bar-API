const express = require('express');
const app = require('./src/configs/app.config');
const PORT = 3000;

//Routers
const ordersRouter = require('./src/routes/ordersRouter');
app.use("/orders", ordersRouter);

app.get('/', (req, res, next) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })