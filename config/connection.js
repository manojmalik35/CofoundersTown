const mongoose = require("mongoose")
const { DB } = require("./index")

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    autoIndex : false
})
    .then((conn) => {
        console.log("DB connected")
    })
    .catch(err => {
        console.log(err)
    })