const mongoose = require("mongoose")
const express = require("express");

const connection = async () => {
    await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("database is connected")
    }).catch((error) => {
        console.log("error in connection with database",error);
    })
}

module.exports = connection