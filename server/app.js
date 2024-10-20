const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const userRouter = require('./router/userRouter.js')

app.use(express.static('../client'))
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads',express.static("./uploads"));
app.use(express.json({ limit: "50mb" }));
app.use(userRouter);

app.listen(process.env.PORT,() =>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})