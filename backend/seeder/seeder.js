
const Product = require("../models/productmodel")
const product = require("./data");
const mongoose = require("mongoose");
const connection = require("../config/database");

// connection();

const seedProduct = async () => {
    try {
        await mongoose.connect("mongodb+srv://bismil:laptop65@cluster0.us7sv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await Product.deleteMany();
        console.log("product deleted");

        await Product.insertMany(product);
        console.log("inserted");

        process.exit()

    } catch (error) {

        console.log(error.message);

        process.exit()
    }
}

seedProduct();
// module.exports = seedProduct