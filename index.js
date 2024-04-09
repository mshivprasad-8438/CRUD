const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

const mongoose = require('mongoose');
const connectdB=async ()=>{
    const url = 'mongodb+srv://admin:Nani@cluster0.mfpau1l.mongodb.net/?retryWrites=true&w=majority';
    
    try{
        // console.log("before connect");
        await mongoose.connect(url);
        console.log(`Connect ${url}`);
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
    
    return;
}
connectdB();


app.use(bodyParser.json());

// Define route for creating a new document
app.post('/insert', async (req, res) => {
    try {
      // Access the collection from the Mongoose connection
      const collection = mongoose.connection.collection('data');
      console.log(req.body);
      // Insert data into MongoDB
      const result = await collection.insertOne(req.body);
      
      res.status(201).json({ message: 'Document inserted successfully', insertedId: result.insertedId });
    } catch (error) {
      console.error('Error inserting document:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Define route for reading data
app.get('/read', async (req, res) => {
    try {
      // Access the collection from the Mongoose connection
      const collection = mongoose.connection.collection('data');
      
      // Retrieve data from MongoDB
      const data = await collection.find().toArray(); // Convert cursor to array
      
      console.log(data);
      
      res.json(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
