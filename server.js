const express = require('express')

const bodyParser = require('body-parser')
var path = require('path');
const app = express() 


app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    db = client.db('app_cw2')
})
var urlencodeParser = bodyParser.urlencoded({extended:false})
app.use(bodyParser.json())

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName) 
    return next()
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

})


app.get('/', function (req, res) { 
    res.send('Select a collection, e.g., /penchod/messages')
 }) 
  app.get('/collections/:collectionName', urlencodeParser,(req, res) => {
        res.setHeader ('Access-Control-Allow-Origin', '*')
        req.collection.find({}, { limit: 10, sort: [['price', -1]] }).toArray((e, results) =>
        {         if (e) return next(e)        
             res.send(results)    
          console.log(req.body)
             })

             }) 

app.post('/collections/:collectionName', urlencodeParser,(req, res, next) => {
    res.setHeader ('Access-Control-Allow-Origin', '*')
req.collection.insert(req.body, (e, results) => {
 if (e) return next(e)
 res.send(results.ops)
   })
 })

 const ObjectID = require('mongodb').ObjectID;
 app.get('/collections/:collectionName/:id', (req, res, next) => { 
console.log('searching json object with id:', req.params.id)
req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => { 
    if (e) return next(e)
    res.send(result)
})
}) 

app.put('/collections/:collectionName/:id', (req, res, next) => {
 req.collection.update({ _id: new ObjectID(req.params.id) },
 { $set: req.body },
 { safe: true, multi: false }, (e, result) => {
    if (e) return next(e) 
    res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' }) 
})
})

app.delete('/collections/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne({ _id: ObjectID(req.params.id) }, (e, result) => {
        if (e) return next(e)
        res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
    })
})  

app.listen(3000)