const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodb-crud.vsjom.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const PORT = 5000;



const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
client.connect(err => {
  const employeeCollection = client.db("crud_db").collection("employee");
  
  app.post('/addNew',(req, res) => {
      employeeCollection.insertOne(req.body)
      .then((result) => {
          console.log(result);
      })
      
      res.send('add success');
  });

  app.get('/allemployee', (req, res)=>{
      const allEmployee = employeeCollection.find({})
      .toArray((err,docs)=>{
          res.send(docs)
      })
      
      
  })



});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(PORT)