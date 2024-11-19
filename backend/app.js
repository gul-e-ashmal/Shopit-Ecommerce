const express = require("express");
const app = express();
const connection = require('./config/database');
const cors = require('cors');
const productRouter = require("./routes/product");
const userRouter = require("./routes/user")
const orderRouter = require("./routes/order")
const paymentRouter = require("./routes/payment");
const cookieParser = require('cookie-parser');
const ErrorMiddleware = require("./middlerware/ErrorMiddlerware")

app.use(cors());

app.on("uncaughtException", (err) => {
    console.log(err);

    console.log("server closing due to uncaught exception")
    process.exit(1);

})


const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" })

connection();

app.use(express.json({
    limit: "10mb", verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));
app.use(cookieParser());


app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter)

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`listening at ${process.env.PORT} in ${process.env.NODE_ENV}`)
})


app.on("unhandledRejection", (err) => {
    console.log("Error", err.stack);
    console.log("server closing due to unhandled rejection")

    server.close(() => {
        process.exit(1);
    })
})