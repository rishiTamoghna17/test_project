
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/router.js');
const { default: mongoose } = require('mongoose');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/test_backend?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});