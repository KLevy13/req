
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const session = require('express-session');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = 3000

app.use(bodyParser.json())

// app.use(express.json({limit: '512mb', extended: true}));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080"], 
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
app.use(session({
    key: "userId",
    secret: "shhh",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 86400000 }
}));

app.use('/posts', postRoutes);
app.use('/users', userRoutes);




mongoose.connect('mongodb+srv://KidRadium:SandManSkatoonBoi@37@cluster0.zvros.mongodb.net/Req?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
.catch((err) => console.log(err));

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://KidRadium:SandManSkatoonBoi@37@cluster0.zvros.mongodb.net/mReq?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
module.exports = app

