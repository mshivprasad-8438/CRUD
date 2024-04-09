const axios = require('axios');

// Define the URL of the insert API endpoint
const url = 'http://localhost:9000/insert'; // Replace this with your actual server URL

// Define the data you want to insert
const dataToInsert = {
    name: 'Shiv',
    age: 30,
    email: 'nani@example.com'
};

// Send a POST request to the insert API endpoint
axios.post(url, dataToInsert)
    .then(response => {
        // Handle successful response
        console.log('Data inserted successfully:', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error inserting data:', error.message);
    });
